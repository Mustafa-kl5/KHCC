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
export const addStudy = (
  studyName: string,
  piName: string,
  studyNumber: string,
  studyKeywords: string,
  studyInitDate: string,
  files: string[]
) => {
  return ApiService.fetchData({
    url: `${baseURL}/superAdmin/addStudy`,
    method: "POST",
    data: {
      studyName,
      piName,
      studyNumber,
      studyKeywords,
      studyInitDate,
      files,
    },
  });
};

export const getStudies = () => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/getStudies`);
};

export const addFreezer = (
  freezerName: string,
  freezerModel: string,
  freezerLocation: string,
  freezerType: string,
  NumberOfShelves: number,
  BoxesPerShelf: number
) => {
  return ApiService.fetchData({
    url: `${baseURL}/superAdmin/addFreezer`,
    method: "POST",
    data: {
      freezerName,
      freezerModel,
      freezerLocation,
      freezerType,
      NumberOfShelves,
      BoxesPerShelf,
    },
  });
};

export const getFreezers = () => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/getFreezers`);
};

export const DeleteFreezer = (Id: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/superAdmin/giveDeleteFreezerReason`,
    method: "DELETE",
    data: {
      Id,
    },
  });
};
