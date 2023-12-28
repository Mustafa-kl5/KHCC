export interface iAddPatient {
  patientName: string;
  patientIdentity: {
    mrn?: string | undefined;
    ssn?: string | undefined;
  };
  dayCode: string;
  researchId: string;
  gender: string;
  admitionRecDate: string;
  birthDate: string;
  sampleDrawing: string;
}
