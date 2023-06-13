import axios from "axios";

export const carsAPI = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
  timeout: 10000,
});

export const API = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
});
