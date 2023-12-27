import ApiService from "./api";
const baseURL = "api/v1";

export const getPendingUsers = () => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/userPermission`);
};
export const givePermission = (userId: string, permission: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/superAdmin/givePermission`,
    method: "PUT",
    data: {
      userId,
      permission,
    },
  });
};
