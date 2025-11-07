export type emailData = {
  newEmail: string;
};

export type emailVerify = {
  newEmail: string;
  code: number;
};

export type emailFail = {
  error: string;
  message: string[];
  statusCode: number;
};

export type emailSucces = {
  message: string;
  success: boolean;
};
