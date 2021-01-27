import api from './api';
export const BASE_URL = 'https://api.mesto-mpozharskiy.students.nomoredomains.rocks';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
}; 

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    if (res.status === 400) {
      throw new Error('Не все поля заполнены');
    } else if (res.status === 401) {
      throw new Error('Email не зарегистрирован');
    } else return res.json();
  })
  .then((data) => {
    console.log(data)
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      api.updateHeaders();
      return data.token;
    }
  })
}

export const getContent = (token) => {return fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${token}`,
  },
})
  .then((res) => {
    return res.json()
  })
  .then((data) => data)
}
