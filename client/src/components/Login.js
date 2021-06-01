import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { allUsers, login } from '../services/auth'
// import {user, setUser} from '../App'

// console.log('login loading')

function useInput(initialValue){
  const [value, setValue] = useState(initialValue);
  
  function handleChange(event){
    setValue(event.target.value);
  }

  return [value,handleChange]
}

export default function Login(props) {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [message, setMessage] = useState('');
  
  console.log(props.user)

  const handleSubmit = event => {
    event.preventDefault();
    login(email, password).then(data => {
      if (data.message) {
        setMessage(data.message);
      } else {
        props.setUser(data)
        props.history.push('/dashboard');
      }
    });
  };

  // console.log('login function loading')
  return (
    <div>
    <h1>Login.js</h1>
    <div class='loginForm'>
    <form onSubmit={handleSubmit}>

        <label>Email</label>
        <input 
          type='text'
          name='email'
          value={email}
          onChange={setEmail}
          id='email'
        />

        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={password}
          onChange={setPassword}
          id='password'
        />
        
{message && (
<alert variant='danger'>{message}</alert>
)}

<button type='submit'>Login</button>
</form>
    </div>
    <Link to="/auth/google">Login With Google</Link>
    </div>
  )
}