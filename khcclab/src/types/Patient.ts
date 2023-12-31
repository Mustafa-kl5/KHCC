export interface iPatient {
  _id: string;
  patientName: string;
  ssn: string;
  mrn: string;
  dayCode: string;
  researchId: string;
  gender: string;
  admitionRecDate: string;
  birthDate: string;
  sampleDrawing: string;
  isDeleted: boolean;
  deleteReason: string;
  seen: boolean;
  seenBy: string;
}

export interface iPatientList {
  patients: iPatient[];
}
