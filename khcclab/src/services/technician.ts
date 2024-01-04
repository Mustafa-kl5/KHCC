import ApiService from "./api";

const baseURL = "api/v1";

export const getPatients = (filter?: {
  isDeleted: string;
  patientName: string;
}) => {
  return ApiService.baseApi.get(`${baseURL}/technician/patients`, {
    params: filter,
  });
};

export const seen = (patientId: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/technician/giveSeen`,
    method: "PUT",
    data: {
      patientId,
    },
  });
};
export const getSamples = () => {
  return ApiService.baseApi.get(`${baseURL}/technician/getSamples`);
};
