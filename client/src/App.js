import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" component={Login}></Route>
      </BrowserRouter>
    </div>
    
  );
}

export default App;