import React from 'react'
import { Link } from 'react-router-dom';

console.log('home loading')

export default function Home() {
  console.log('home function')
  return (
    <div class='body'>
    <h1>This is home.js</h1>
    <div class='homePageButtons'>
    <Link to='/signup'>Signup</Link>
    <Link to='/login'>Login</Link>
    </div>
    </div>
  )
}