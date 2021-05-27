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
  console.log(user.firstname)
  return (
    <div className='UserNavbar'>
      <h2>user: </h2>
      <Link to='/'>Home</Link>
    </div>
  )
}

export default UserNavbar