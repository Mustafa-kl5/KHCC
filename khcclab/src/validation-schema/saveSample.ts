import { object, string } from "yup";

export const saveSampleSchema = object({
  freezerId: string().required("Freezer is required!"),
  cells: string().required("Please Choose Cells!"),
  numberOfSamples: string().required("number Of samples is required!"),
  mainBoxType: string().required("Main box type is required!"),
  subBoxType: string().required("Sub box type is required!"),
  subBoxId: string().required("Main box ID is required!"),
  mainBoxId: string().required("Sub box ID is required!"),
}).required();
