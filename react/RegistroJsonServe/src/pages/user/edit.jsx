import React from 'react'
import { useLocation } from 'react-router-dom' 
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditUser = () => {

    const[nome, setNome] = useState('')
    const[sobrenome, setSobrenome] = useState('')
    const[idade, setIdade] = useState('')
    const[idEdit, setIdeEdit] = useState()
    const location = useLocation()

    let id = location?.state?.id
    const api = location?.state?.api

    async function findOneUser(){
        if(id !== ''){
            try {
                let path = api + `/${id}`
                await axios.get(path)
                .then(response =>{
                    setNome(response.data.nome)
                    setSobrenome(response.data.sobrenome)
                    setIdade(response.data.idade)
                })
                id = ''
                
            } catch (error) {
                alert(`Erro ao atualizar ${error}`)
            }
        }
    }

    useEffect(() => {
        findOneUser()
        setIdeEdit(id)
    }, [])

    async function handleEditSave(e){
        e.preventDefault()
        try {
            let path = api + `/${idEdit}`
            axios.put(path, {
                id: idEdit,
                nome: nome,
                sobrenome: sobrenome,
                idade: idade
            })
            .then((response)=>{
                alert('Dados atualizados com sucesso!')
                setNome(response.data.nome)
                setSobrenome(response.data.sobrenome)
                setIdade(response.data.idade)
            })
        } catch (error) {
            alert('Erro ao editar dados')
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
