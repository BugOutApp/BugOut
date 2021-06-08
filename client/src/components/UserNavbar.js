import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const UserNavbar = props => {
  console.log('user recieved by UserNavbar:', props.user)
  return (
    <div className='UserNavbar'>
      {props.user ? (
        <Link to='/' onClick={() => handleLogout(props)}>
        Logout {props.user.firstname}
      </Link>
      ) : (
        <div className='noUserNavbar'>
        <ul>
        <li>
        <Link to='/signup'>Signup</Link>
        </li>
        <li>
        <Link to='/login'>Login</Link>
        </li>
        </ul>
        </div>
      )}
    </div>
  )
}

export default UserNavbar