export type ResetForm = {
  email: string;
  code: number;
};

export type ResetResponse = {
  message: string;
  success: boolean;
};

export type ErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};
