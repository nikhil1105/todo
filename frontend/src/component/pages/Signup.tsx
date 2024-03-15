import React, { useState, useEffect, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
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
        })
    }


    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios
        .post('http://localhost:3001/register', { email, username, password })
        .then(() => {
            alert('Registration Successful')
            setEmail('')
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/login')
        })
        .catch((error:any) => {
            seterr(error)
            console.log('Unable to register user')
        })

    }

  return (
    <div >
        <div >
            <form 
            onSubmit={handleSubmit}>
                <label>Email</label>
                <br />
                <input 
                required
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
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
                type='submit'>Sign Up</button>
            </form>
        </div>
        <div >
        <h2 >{err?.response?.data?.error}</h2>
        </div>
    </div>
  )
}

export default SignUp
