export type passwordData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type passwordSucces = {
  message: string;
};

export type passwordError = {
  error: string;
  message: string[];
  statusCode: number;
};
