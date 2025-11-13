const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

const API_ENDPOINTS = {
  login: `${BASE_URL}users/login`,
  register: `${BASE_URL}users/register`,
  book: `${BASE_URL}books`,
};

export default API_ENDPOINTS;
