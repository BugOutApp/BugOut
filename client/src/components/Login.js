import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div>
    <Link to="/auth/google">Login With Google</Link>
    </div>
  )
}