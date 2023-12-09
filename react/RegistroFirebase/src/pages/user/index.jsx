import React, { useEffect, useState } from 'react'
import { Form, Button } from 'bootstrap-4-react';
import {db} from '../../services/firebaseConnection'
import { addDoc, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const MyUser = () => {

    const[nome, setNome] = useState()
    const[sobrenome, setSobrenome] = useState()
    const[idade, setIdade] = useState()
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    async function findAllUsers(){
        const  userRef = collection(db, 'topicos')
        await getDocs(userRef)
        .then((snapshot)=>{
            let lista = []
            snapshot.forEach((doc)=>{
                lista.push({
                    id:doc.id,
                    nome: doc.data().nome,
                    sobrenome: doc.data().sobrenome,
                    idade: doc.data().idade
                })
            })
            setUsers(lista)
        })
    }

    useEffect(()=>{
        findAllUsers()
    }, [users])

    async function registerUser(e){
        e.preventDefault();
        try {
          const docRef = await addDoc(collection(db, "topicos"), {
            nome: nome,
            sobrenome: sobrenome,
            idade: idade,
          });
          setNome('');
          setSobrenome('');
          setIdade('');
          alert('Dados salvos!');
        } catch (error) {
          console.log(error);
        }
    };
    
    async function handleDelete(id){
        console.log('entra na funcao')
        const docRef = doc(db, 'topicos', id)
        await deleteDoc(docRef)
        .then(() =>{
            alert('Usuário deletado!')
        })
        .catch(() =>{
            alert('Erro ao Deletar')
        })
    }

    function handleEdit(idUser){
        console.log('entra no handle edit')
        navigate('/editUser', {state:{id: idUser}})
    }

    return (
        <div className='container'>
            <form onSubmit={registerUser}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" className="form-control" value={nome} onChange={(e)=>setNome(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Sobrenome:</label>
                    <input type="text" className="form-control" value={sobrenome} onChange={(e)=>setSobrenome(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Idede:</label>
                    <input type="text" className="form-control" value={idade} onChange={(e)=>setIdade(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

                <div className="container-table">
                    <br />
                    <h3>Lista de usuários Registrados</h3>
                    <ol>
                        {
                            users.map((item)=>(
                                <li className='lista' key={item.id}> <b>Nome:</b> {item.nome} - 
                                <b>Sobrenome:</b> {item.sobrenome} - 
                                <b>Idade:</b> {item.idade} 
                                
                                <button onClick={() => handleDelete(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>

                                <button onClick={() => handleEdit(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </button>
                                </li>
                            ))
                        }
                    </ol>
                </div>
        </div>
    )
}

export default MyUser
