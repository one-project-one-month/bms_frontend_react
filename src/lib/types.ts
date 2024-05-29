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

export type TranscationHistory = {
  transcationHistoryId: number;
  adminName: string;
  receiverName?: 'Ma Khin';
  receiverEmail?: 'khin@gmail.com';
  userEmail?: string;
  senderName?: string;
  senderEmail?: string;
  type: 'transfer' | 'deposit' | 'withdraw';
  amount: number;
  transactionTime: string;
};
