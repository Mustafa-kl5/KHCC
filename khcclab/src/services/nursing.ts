import ApiService from "./api";

const baseURL = "api/v1";

export const addPatient = (
  patientName: string,
  ssn: string,
  mrn: string,
  dayCode: string,
  researchId: string,
  birthDate: string,
  admitionRecDate: string,
  gender: string,
  sampleDrawing: string
) => {
  return ApiService.fetchData({
    url: `${baseURL}/nursing/addPatient`,
    method: "POST",
    data: {
      patientName,
      ssn,
      mrn,
      dayCode,
      researchId,
      birthDate,
      admitionRecDate,
      gender,
      sampleDrawing,
    },
  });
};

export const getPatientsList = () => {
  return ApiService.baseApi.get(`${baseURL}/nursing/patientList`);
};

export const giveDeletePaitentReason = (patientId: string, reason: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/nursing/giveDeletePaitentReason`,
    method: "PUT",
    data: {
      patientId,
      reason,
    },
  });
};
