export interface iUser {
  employeeId: string;
  position: string;
  department: string;
  firstName: string;
  lastName: string;
  role: string;
  createAt: string;
  _id: string;
}
export interface iUserList {
  users: iUser[];
}
