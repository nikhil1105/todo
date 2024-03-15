import { useState } from 'react'
import './App.css'
import TodoList from './component/Todo';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Home from './component/pages/Home';
import Login from './component/pages/Login';
import SignUp from './component/pages/Signup';

export interface todo {
  id: string;
  title: string;
  description: string;
  status: string;
  completedOn: string
}

function App() {

  const isUserSignedIn = !!localStorage.getItem('token')


  return (
    <>
    <div className='appmain' >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        {isUserSignedIn && <Route path='/todo' element={<TodoList />} />}
      </Routes>
    </div>
    </>
  )
}

export default App
