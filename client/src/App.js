import { React, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import UserNavbar from './components/UserNavbar'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateTicket from './components/CreateTicket';
import AllTickets from './components/AllTickets';
import EditTicket from './components/EditTicket';

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
     <Route
        exact path = '/tickets'
        component={AllTickets}
      /> 
      <Switch>
    <Route 
    exact path='/tickets/new'
    component={CreateTicket}
    />
    <Route
    exact path='/tickets/:id'
    component={EditTicket}
    />
    </Switch>
    </div>
    
  );
}

export default App;