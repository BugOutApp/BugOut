import React from 'react'
import { Link } from 'react-router-dom'

console.log('login loading')

export default function Login() {
  console.log('login function loading')
  return (
    <div>
    <h1>Login.js</h1>
    <Link to="/auth/google">Login With Google</Link>
    </div>
  )
}