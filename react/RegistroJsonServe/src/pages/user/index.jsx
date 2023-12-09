import React, { useEffect, useState } from 'react';
import { Form, Button } from 'bootstrap-4-react';
import { db } from '../../services/firebaseConnection';
import { addDoc, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyUser = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [users, setUsers] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const navigate = useNavigate();
  const api = 'http://localhost:3000/users';

  async function findAllUsers() {
    try {
      const response = await axios.get(api);
      setUsers(response.data);
    } catch (error) {
      alert(`Erro ao listar usuários ${error}`);
    }
  }

  useEffect(() => {
    findAllUsers();
    setUpdateList(false);
  }, [updateList]);

  async function registerUser(e) {
    e.preventDefault();
    if (nome === '') {
      return false;
    }

    try {
      const listUsers = await axios.get(api);
      const lastId = parseInt(listUsers.data.length) + 1;

      await axios.post(api, {
        id: lastId,
        nome: nome,
        sobrenome: sobrenome,
        idade: idade,
      });

      setNome('');
      setSobrenome('');
      setIdade('');
      setUpdateList(true);
      alert('Dados salvos!');
    } catch (error) {
      alert(`Erro ao salvar dados ${error}`);
    }
  }

  async function handleDelete(id) {
    try {
      const path = `${api}/${id}`;
      await axios.delete(path);
      setUpdateList(true);
      alert('Usuário deletado com sucesso!');
    } catch (error) {
      alert(`Erro ao deletar ${error}`);
    }
  }

  function handleEdit(idUser) {
    navigate('/editUser', { state: { id: idUser, api: api } });
  }

  return (
    <div className='container'>
      <form onSubmit={registerUser}>
        <div className='form-group'>
          <label>Nome:</label>
          <input type='text' className='form-control' value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Sobrenome:</label>
          <input type='text' className='form-control' value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Idade:</label>
          <input type='text' className='form-control' value={idade} onChange={(e) => setIdade(e.target.value)} />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>

      <div className='container-table'>
        <br />
        <h3>Lista de usuários Registrados</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.sobrenome}</td>
                <td>{item.idade}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)} className='btn btn-danger'>
                    Excluir
                  </button>
                  <button onClick={() => handleEdit(item.id)} className='btn btn-warning'>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyUser;
