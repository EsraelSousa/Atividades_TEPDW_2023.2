import React, { useState } from 'react'
import { Form, Button } from 'bootstrap-4-react';
import {db} from '../../services/firebaseConnection'
import { addDoc, collection, getDocs } from 'firebase/firestore';

const MyUser = () => {

    const[nome, setNome] = useState()
    const[sobrenome, setSobrenome] = useState()
    const[idade, setIdade] = useState()

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
        </div>
    )
}

export default MyUser
