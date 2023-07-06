import axios from "axios";

export const carsAPI = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
  timeout: 10000,
});

export const API = axios.create({
  baseURL: "https://34motors-api-production.up.railway.app",
  timeout: 15000,
});
