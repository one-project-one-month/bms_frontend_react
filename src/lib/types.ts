import exp from 'constants';
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

export type ResponseData = z.infer<typeof ResponseDataSchema>;

export const RequestBodySchema = z.object({
  process: z.literal('transfer'),
  data: z.object({
      sender: z.string(),
      receiver: z.string(),
      transferAmount: z.number(),
  }),
});

const errorSchema = z.object({
message : z.string()
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
