import { React, useState } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'

import UserNavbar from './components/UserNavbar'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import CreateTicket from './components/CreateTicket';
import AllTickets from './components/AllTickets';
import EditTicket from './components/EditTicket';

function App(props) {
  const [user, setUser] = useState(props.user)
  console.log('user recieved by App.js:', user)
  return (
    <div className="App">
      <UserNavbar
        user={user}
        setUser={setUser} />
      <Route
        exact path = "/"
        render={props => <Home setUser={setUser} user={user} {...props} />}
      /> 
      <Route
        exact path="/login" 
        render={props => <Login setUser={setUser} {...props} />}
      />
      <Route
        exact path="/signup"
        render={props => <Signup setUser={setUser} {...props} />}
      />
     <ProtectedRoute
        exact path="/tickets"
        user={user}
        component={AllTickets}
        redirectPath="/login"
      /> 

      <ProtectedRoute
        exact path="/dashboard"
        user={user}
        component={Dashboard}
        redirectPath="/login"
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