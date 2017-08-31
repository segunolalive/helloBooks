import axios from 'axios';
import actionTypes from '../actions/actionTypes';


export const loginUser = (user => ({
  type: actionTypes.LOGIN,
  user,
}));

// export const API = 'https://segunolalive-hellobooks.herokuapp.com/api/v1';
// let API = 'https://hellobooks.herokuapp.com/api/v1';

let API = 'http://localhost:3000/api/v1';

export /**
 * @param {any} data - user data
 * @returns {any} - dispatches login user action
 */

// const login = data => axios.post(`${API}/login`, data)
//   .then((response) => {
//     sessionStorage.setItem('token', response.data.token);
//     console.log(response.data);
//   }).catch(error => console.log(error));



// const login = data => dispatch => axios.post(`${API}/login`, data)
//   .then((response) => {
//     sessionStorage.setItem('token', response.data.token);
//     console.log(response);
//     dispatch(loginUser(response.data));
//   }, (err) => {
//     console.log(err);
//   })

const login = data => axios.post(`${API}/login`, data)
  .then((response) => {
    sessionStorage.setItem('token', response.data.token);
    console.log(response);
  }).catch(e => console.log(e));
