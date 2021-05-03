import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route
        exact path = "/"
        compotent={Home}
      /> 
        <Route
        exact path="/login" 
        component={Login}
        />
      </BrowserRouter>
    </div>
    
  );
}

export default App;