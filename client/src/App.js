import { React, useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
// import Login from './components/Login'
import Home from './components/Home';

console.log('app loading')

function App(props) {
  
  const [user, setUser] = useState(props.user)
  console.log('App functional called')
  return (
    <div className="App">
    <h1>HELLO?</h1>
    <Route
        exact path = "/"
        compotent={Home}
        user={user}
        setUser={setUser}
      /> 
        {/* <Route
        exact path="/login" 
        component={Login}
        /> */}
    </div>
    
  );
}

export default App;