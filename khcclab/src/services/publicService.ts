import axios from "axios";
const baseURL = "http://192.168.20.38:4111/api/v1";

export const getStudiesOptions = () => {
  return axios.get(`${baseURL}/public/getStudiesOption`);
};
