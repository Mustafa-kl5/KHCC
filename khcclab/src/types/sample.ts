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
  rejectReason: string;
  isRejected: boolean;
  isApproved: boolean;
  khccBioSampleCode: string;
}

export interface iSampleList {
  samples: iSample[];
}
