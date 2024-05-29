import exp from 'constants';

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

type UserName = {
  name: string;
};

type AdminCode = {
  adminCode: string;
};

export type TranscationHistory = {
  id: string;
  amount: number;
  sender?: UserName;
  receiver?: UserName;
  user?: UserName;
  note?: string;
  type: 'deposit' | 'withdraw';
  time: Date;
  admin?: UserName & AdminCode;
};

export type TranscationHistoryResponse = {
  data: TranscationHistory[];
};
