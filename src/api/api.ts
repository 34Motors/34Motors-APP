import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4002/",
    timeout: 5000,
})