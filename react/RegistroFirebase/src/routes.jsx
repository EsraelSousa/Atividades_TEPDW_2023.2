import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyNavbar from './components/nav'
import Dashboard from './pages/dashboard'
import MyUser from './pages/user'

const RoutesApp = () => {
    return (
        <>
            <BrowserRouter>
            <MyNavbar/>
            <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/user' element={<MyUser/>} />
            </Routes>
            </BrowserRouter>
        </>
    )
}

export default RoutesApp
