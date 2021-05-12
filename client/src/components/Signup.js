import { React, useState } from 'react'
import { signup } from '../services/auth'

export default function Signup(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [message, setMessage] = useState()

  const handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
    
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    signup(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: '',
          password: ''
        });
      } else {
        this.props.setUser(data);
        this.props.history.push('/projects');
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
          onChange={handleChange}
          id='email'
        />

        <label>Password</label>
        <input 
          type='text'
          name='password'
          value={password}
          onChange={handleChange}
          id='password'
        />

        <label>Firstname</label>
        <input 
          type='text'
          name='firstname'
          value={firstname}
          onChange={handleChange}
          id='firstname'
        />

        <label>Lastname</label>
        <input 
          type='text'
          name='lastname'
          value={lastname}
          onChange={handleChange}
          id='lastname'
        />
        
{/* {message && (
<Alert variant='danger'>{message}</Alert>
)} */}

<button type='submit'>Signup</button>
</form>
    </div>
    </div>
  )
}