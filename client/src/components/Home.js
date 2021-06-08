import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='body'>
    <h1>This is home.js</h1>
    <div className='homePageButtons'>
    <Link to='/signup'>Signup</Link><br/>
    <Link to='/login'>Login</Link>
    </div>
    </div>
  )
}