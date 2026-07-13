import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://api.frankfurter.dev/v2",
  timeout: 10000,
});
