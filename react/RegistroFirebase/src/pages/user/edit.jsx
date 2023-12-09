import React from 'react'
import { useLocation } from 'react-router-dom' 
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card } from 'bootstrap-4-react/lib/components'
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import {db} from '../../services/firebaseConnection'

const EditUser = () => {

    const[nome, setNome] = useState('')
    const[sobrenome, setSobrenome] = useState('')
    const[idade, setIdade] = useState('')
    const location = useLocation()

    const id = location?.state?.id

    async function findOneUser(){
        if(id !== ''){
            const userRef = doc(db, 'topicos', id)
            await getDoc(userRef)
            .then((user) =>{
                setNome(user.data().nome),
                setSobrenome(user.data().sobrenome),
                setIdade(user.data().idade)
            })
            .catch((erro) => {
                alert(`Erro ao buscar ${erro}`)
            })
        }
    }

    useEffect(() => {
        findOneUser()
    }, [])

    async function handleEditSave(e){
        e.preventDefault()
        try {
            const docRef = doc(db, 'topicos', id)
            await updateDoc(docRef, {
                nome: nome,
                sobrenome: sobrenome,
                idade: idade
            })
            .then(()=>{
                alert('Dados alterados com sucesso!')
            })
        } catch (error) {
            alert('Erro ao editar dador')
        }
    }

    return (
        <>
            <div className="contaner">
                <form>
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
                <button onClick={(e) => handleEditSave(e)} type="submit" className="btn btn-primary">Atualizar</button>
                </form>
            </div>  
        </>
    )
}

export default EditUser
