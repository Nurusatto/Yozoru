export type FormProps = {
  email: string;
  password: string;
  code: string;
};

export type message = {
  message: string;
};

export type FormVerify = {
  email: string;
  code: string;
};

type OmitLast<T> = Omit<T, "code">;

export type OmitFromProp = OmitLast<FormProps>;
