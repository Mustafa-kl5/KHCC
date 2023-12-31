export interface iStudyOption {
  _id: string;
  studyName: string;
  studyNumber: string;
}
export interface iStudy {
  _id: string;
  studyName: string;
  piName: string;
  studyNumber: string;
  studyKeywords: string;
  studyInitDate: string;
  files: string[];
  closeData: string;
  isClosed: boolean;
  createAt: string;
}
