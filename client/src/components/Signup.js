import { React, useState } from 'react'
import { signup } from '../services/auth'

function useInput(initialValue){
  const [value, setValue] = useState(initialValue);
  
  function handleChange(event){
    setValue(event.target.value);
  }

  return [value,handleChange]
}

export default function Signup(props) {

  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const [firstname, setFirstname] = useInput();
  const [lastname, setLastname] = useInput();
  const [message, setMessage] = useInput()

  const handleSubmit = event => {
    event.preventDefault();
    console.log(email, password, firstname, lastname)
    signup(email, password, firstname, lastname).then(data => {
      if (data) {
        console.log(data);
        setMessage(data);
        setEmail('');
        setPassword('');
        setFirstname('');
        setLastname('')
      } else {
        props.useState(data);
        props.history.push('/dashboard');
      }
    });
  };

  return (
    <div>
    <h1>User signup</h1>
    <div class='signupForm'>
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

        <label>Firstname</label>
        <input 
          type='text'
          name='firstname'
          value={firstname}
          onChange={setFirstname}
          id='firstname'
        />

        <label>Lastname</label>
        <input 
          type='text'
          name='lastname'
          value={lastname}
          onChange={setLastname}
          id='lastname'
        />
        
{message && (
<alert variant='danger'>{message}</alert>
)}

<button type='submit'>Signup</button>
</form>
    </div>
    </div>
  )
}