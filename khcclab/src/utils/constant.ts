export const PASSWORD_PATTERN = /^().{8,}$/;
export const ACCESS_TOKEN = "access-token";
export const USER_ROLE = "user-role";
export const REQUEST_HEADER_AUTH_KEY = "Authorization";
export const TOKEN_TYPE = "Bearer ";
export const Permissions = [
  { id: 1, label: "SuperAdmin", value: "superAdmin" },
  { id: 2, label: "Nursing", value: "nursing" },
  { id: 3, label: "Technician", value: "technician" },
];
export const allowedTypes = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "image/jpeg", // .jpg
  "image/png", // .png
  "image/gif",
];
