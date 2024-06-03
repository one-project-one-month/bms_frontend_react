export type ResponseDataType<T> = {
  status: string;
  message: string;
  data?: T[];
  error?: string | string[] | null;
  time?: string;
};

export type PaginationResponseType<T> = {
  current_page: number;
  total: number;
  per_page: number;
  size: number;
  dtoList: T[];
};

export type User = {
  id: number | null;
  fullName: string;
  status: string;
  roles: string;
};

export type UserForm = {
  id?: string;
  name: string;
  username?: string;

  email: string;
  balance: number;
  isDeleted?: boolean;
  isDeactivated?: boolean;
  stateCode: string;
  townshipCode: string;
};
