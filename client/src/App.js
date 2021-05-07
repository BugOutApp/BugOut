import { React, useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup';
import CreateTicket from './components/CreateTicket';
import AllTickets from './components/AllTickets';

console.log('app loading')

function App() {

  // const [user, setUser] = useState(props.user)
  // console.log(props.user)
  return (
    <div className="App">
    {/* <h1>This is app.js</h1> */}

    <Route
        exact path = '/tickets'
        component={AllTickets}
      /> 

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
    <Route 
    exact path='/tickets/new'
    component={CreateTicket}
    />
    </div>
    
  );
}

export default App;