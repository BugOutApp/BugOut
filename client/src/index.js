import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import axios from 'axios';
// import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = 'http://localhost:5005';

axios.get('/api/auth/loggedin')
  .then(response => {
    console.log('user recieved by index.js:', response.data)
    const user = response.data;
    ReactDOM.render(
      <BrowserRouter>
        <App user={user} />
      </BrowserRouter>,
      document.getElementById('root')
    );
  })
  // .catch(error => {
  //   ReactDOM.render(
  //     <BrowserRouter>
  //       <App user={{}} />
  //     </BrowserRouter>,
  //     document.getElementById('root')
  //   );
  //   console.log(error)
  // })

  // ReactDOM.render(
  //   <BrowserRouter>
  //     <App user={{name: 'Michael'}} />
  //   </BrowserRouter>,
  //   document.getElementById('root')
  // );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
