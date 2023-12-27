import ApiService from "./api";
const baseURL = "api/v1";

export const getPendingUsers = () => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/userPermission`);
};
