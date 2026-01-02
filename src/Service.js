import axios from "axios"
import { useJwt } from "react-jwt";

const getRealmSecret = (id) => {
  return  axios.get(`http://localhost:2000/secrets/${id}`)
}

const isExpired = (token) => {
  if (!token) return true;
  
  const parts = token.split('.');
  if (parts.length !== 3) return true;
  
  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));

  console.log(payload.exp * 1000 > Date.now());
  
  return payload.exp * 1000 > Date.now();

};
const verifyToken = (token) => {
  if (!token) return false;
  if (isExpired(token)) {
    let refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;
    if (!isExpired(refreshToken)) {
      return axios.post('http://localhost:2000/realms/users/refresh',refreshToken)
    }
    // logout
  };
}

export {getRealmSecret, isExpired};