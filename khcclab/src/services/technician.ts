import { getStudyId } from "utils/getStudyId";
import ApiService from "./api";

const baseURL = "api/v1";

export const getPatients = (filter?: {
  isDeleted: string;
  patientName: string;
}) => {
  const study = getStudyId()._id;
  return ApiService.baseApi.get(`${baseURL}/technician/patients`, {
    params: { ...filter, studyId: study },
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
export const getApprovalSamples = () => {
  return ApiService.baseApi.get(`${baseURL}/technician/getApprovalSamples`);
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
export const saveSample = (
  sampleId: string,
  sampleType: string,
  freezerId: string,
  mainBoxType: string,
  subBoxType: string,
  mainBoxId: string,
  subBoxId: string,
  chosenCell: string,
  storageType: string,
  containerType: string,
  drawnAt: string,
  numberOfSamples: string,
  studyNumber: string,
  patientName: string,
  mrn: string,
  ssn: string,
  birthDate: string,
  gender: string,
  sampleDrawing: string,
  sampleSerial: string,
  khccBioSampleCode: string
) => {
  return ApiService.fetchData({
    url: `${baseURL}/technician/saveSample`,
    method: "POST",
    data: {
      sampleId,
      sampleType,
      freezerId,
      mainBoxType,
      subBoxType,
      mainBoxId,
      subBoxId,
      chosenCell,
      storageType,
      containerType,
      drawnAt,
      numberOfSamples,
      studyNumber,
      patientName,
      mrn,
      ssn,
      birthDate,
      gender,
      sampleDrawing,
      sampleSerial,
      khccBioSampleCode,
    },
  });
};
export const getEmptyCells = (query: {
  freezerId: string;
  mainBoxType: string;
  subBoxType: string;
  mainBoxId: string;
  subBoxId: string;
}) => {
  return ApiService.baseApi.get(`${baseURL}/technician/getEmptyCells`, {
    params: {
      ...query,
    },
  });
};

export const sampleToExport = () => {
  return ApiService.baseApi.get(`${baseURL}/technician/sampleToExport`);
};
