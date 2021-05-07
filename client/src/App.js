import { React, useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import UserNavbar from './components/UserNavbar'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

console.log('app loading')

function App(props) {

  const [user, setUser] = useState(props.user)
  console.log(props.user)
  return (
    <div className="App">
      <UserNavbar
        user={user}
        setUser={setUser} />
      <Route
        exact path = "/"
        component={Home}
      /> 
      <Route
        exact path="/login" 
        component={Login}
      />
      <Route
        exact path = "/signup"
        component={Signup}
      /> 
    </div>
    
  );
}

export default App;