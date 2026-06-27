import axios from "axios";
import environment from "../environment/environment";

const api = axios.create({
  baseURL: environment.api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
