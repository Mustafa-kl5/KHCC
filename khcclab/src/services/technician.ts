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
export const rejectSample = (sampleId: string, rejectionReason: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/technician/rejectSample`,
    method: "PUT",
    data: {
      rejectionReason,
      sampleId,
    },
  });
};
export const approveSample = (sampleId: string, khccBioSampleCode: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/technician/approveSample`,
    method: "PUT",
    data: {
      sampleId,
      khccBioSampleCode,
    },
  });
};
