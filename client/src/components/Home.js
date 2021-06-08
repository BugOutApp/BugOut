import React from 'react'
import { Link } from 'react-router-dom';

export default function Home(props) {
  return (
    <div className='body'>
    <h1>This is home.js</h1>
    <div className='homePageButtons'>
    
        <ul>
        <li>
        <Link to='/signup'>Signup</Link>
        </li>
        <li>
        <Link to='/login'>Login</Link>
        </li>
        </ul>
    </div>
    </div>
  )
}