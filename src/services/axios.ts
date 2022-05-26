import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.BASE_URL || "https://zoo-animal-api.herokuapp.com",
  responseType: "json",
};

const instance = axios.create(axiosConfig);
export default instance;