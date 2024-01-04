import { iPatient } from "./Patient";
import { iStudy } from "./study";

export interface iSample {
  _id: string;
  containerType: string;
  sampleType: string;
  drawnAt: string;
  numberOfSamples: string;
  sampleSerial: string;
  author: string;
  createAt: string;
  studyNumber: iStudy;
  patient: iPatient;
}

export interface iSampleList {
  samples: iSample[];
}
