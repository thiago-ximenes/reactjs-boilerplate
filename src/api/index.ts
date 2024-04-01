import axios from "axios";
import apiConfig from "../config/api.config.ts";

const {baseURL, headers} = apiConfig;

export const api = axios.create({
  baseURL,
  headers,
});