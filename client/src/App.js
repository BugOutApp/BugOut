import { React, useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup';

console.log('app loading')

function App() {

  // const [user, setUser] = useState(props.user)
  // console.log(props.user)
  return (
    <div className="App">
    {/* <h1>This is app.js</h1> */}
    <Route
        exact path = "/"
        compotent={Home}
      /> 
    <Route
        exact path="/login" 
        component={Login}
    />
    <Route
        exact path = "/signup"
        compotent={Signup}
      /> 
    </div>
    
  );
}

export default App;