import { React, useState } from 'react'
import { Link } from 'react-router-dom';

import { logout } from '../services/auth';

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const UserNavbar = props => {
  const [user, setUser] = useState(props.user)
  console.log(props.user)
  return (
    <div className='UserNavbar'>
      <h2>user: </h2>
      <Link to='/'>Home</Link>
      {/* {props.user ? ( */}
        <Link to='/' onClick={() => handleLogout(props)}>
        Logout
      </Link>
      {/* ) : ( */}
        <div className='noUserNavbar'>
        <Link to='/signup'>Signup</Link>
        <Link to='/login'>Login</Link>
        </div>
      {/* )} */}
    </div>
  )
}

export default UserNavbar