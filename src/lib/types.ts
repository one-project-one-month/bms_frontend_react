/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

const PersonSchema = z.object({
  name: z.string(),
});

export const ResponseDataSchema = z.object({
  id: z.string().uuid(),
  amount: z.number(),
  time: z.string().datetime(),
  sender: PersonSchema,
  receiver: PersonSchema,
});

export const responseSchema = z.object({
  data: ResponseDataSchema,
});
export type Response = z.infer<typeof responseSchema>;

export const RequestBodySchema = z.object({
  process: z.literal('transfer'),
  data: z.object({
    sender: z.string(),
    receiver: z.string(),
    transferAmount: z.number(),
  }),
});

const errorSchema = z.object({
  response: z.object({
    data: z.object({
      message: z.string(),
    }),
  }),
});

// Define TypeScript types for request and response using the zod schemas
export type RequestBody = z.infer<typeof RequestBodySchema>;
export type error = z.infer<typeof errorSchema>;

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

export type UserFormData = {
  name: string;
  email: string;
  balance: number;
  stateCode: string;
  townshipCode: string;
};

export type UserData = {
  sort(arg0: (a: { id: number }, b: { id: number }) => 1 | -1): UserData[];
  map: any;
  id?: string;
  name: string;
  username?: string;
  email: string;
  balance: number;
  isDeleted?: boolean;
  isDeactivated?: boolean;
  stateCode: string;
  townshipCode: string;
  admin?: {
    name: string;
    adminCode: string;
  };
};

// Type for transaction history

type UserName = {
  name: string;
};

type AdminCode = {
  adminCode: string;
};

export type SliceData = {
  data: any;
};

export type TransactionHistory = {
  data: any;
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
  data: TransactionHistory[];
};

//

export type UserList = {
  admin?: UserName & AdminCode;
  adminId: string;
  balance: number;
  email: string;
  id: string;
  isDeactivated: true | false;
  isDeleted: true | false;
  name: string;
  stateCode: string;
  townshipCode: string;
  username: string;
};

export type UserListResponse = {
  data: UserList[];
};

export type UserNameList = {
  value: string;
  label: string;
};

export type transactionMutationBody = {
  process: string;
  data: {
    username: string;
    amount: number;
  };
};

export type transactionResponse = {
  data: object;
  status: number;
};

export type recentUser = {
  id: string;
  data: string[] | undefined;
};

export type recent = {
  data: {
    name: string;
    amount: number;
  };
};
// type for login process
export type LoginMutationParams = {
  adminCode: string;
  password: string;
};

export type LoginResponseType = {
  data: string;
};
