import axios from "axios";
const baseURL = "http://localhost:4111/api/v1";

export const getStudiesOptions = () => {
  return axios.get(`${baseURL}/public/getStudiesOption`);
};
