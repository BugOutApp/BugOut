import axios from 'axios';

const signup = (email, password, firstname, lastname) => {
  return axios
    .post('http://localhost:5005/api/auth/signup', { email, password, firstname, lastname})
    .then(response => {
      // console.log(response)
      return response.data;
    })
    .catch(err => {
      // console.log(err)
      return err.response.data;
    });
};

const login = (email, password) => {
  return axios
    .post('/api/auth/login', { email, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete('/api/auth/logout')
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export { signup, login, logout };