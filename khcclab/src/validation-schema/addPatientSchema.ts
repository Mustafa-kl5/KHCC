import { object, ref, string } from "yup";

export const addPatientSchema = object({
  patientName: string().required("Patient Name is required!"),
  patientIdentity: object({
    ssn: string().when("mrn", {
      is: (val: string) => val.toString().length >= 1,
      then: (schema) => schema.max(0, "you can use one field only!"),
      otherwise: (schema) => schema.required("At least one field is required!"),
    }),
    mrn: string(),
  }),
  dayCode: string().required("dayCode is required!"),
  researchId: string().required("researchId is required!"),
  gender: string().required("researchId is required!"),
  admitionRecDate: string().required("admitionRecDate is required!"),
  birthDate: string().required("birthDate is required!"),
  sampleDrawing: string().required("sampleDrawing is required!"),
});
