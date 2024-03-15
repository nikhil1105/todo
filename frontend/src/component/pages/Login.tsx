import React, { useState, useEffect, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err,seterr] = useState<any>()
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3001/register')
        .then((res) => {
            console.log(res.data)
        })
    }


    const handleLogin =  async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios
            .post('http://localhost:3001/login', { username, password })
            const token = response.data.token
            alert('Login successful')
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/todo')
            window.location.reload();
            localStorage.setItem('token', token)
        } catch (error:any) {
            seterr(error)
            console.log('Login Error', error)
        }
    }


  return (
    <div className=''>
         <div className=''>
            <form 
            onSubmit={handleLogin}
            >
                 <label>Username</label>
                <br />
                <input
                required
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
                <br />
                <br />
                 <label>Password</label>
                <br />
                <input 
                required
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
                <button 
                type='submit'>Login</button>
            </form>
        </div>
        <div >
            <h2 >{err?.response?.data?.error}</h2>
        </div>
    </div>
  )
}

export default Login