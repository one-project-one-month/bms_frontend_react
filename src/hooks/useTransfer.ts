import { useMutation } from '@tanstack/react-query';
import Axios from '../api-config';
import { RequestBody,RequestBodySchema,responseSchema} from '../lib/types';
import { ZodError } from 'zod';

const endpoints = {
    transactions: 'https://bms-backend-nodejs.vercel.app/api/v1/admins/users/transactions',
  };
  
  
  const submitTransaction = async (gg: RequestBody) => {
    console.log('Request Body:', gg);
  
    try {
      RequestBodySchema.parse(gg);
  
      const response  = await Axios.post(endpoints.transactions, gg);
      console.log('Raw Axios Response:', response);
  
      const responseData = response.data;
      console.log('Response Data:', responseData);

      responseSchema.parse(responseData);
  
      return responseData;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Zod Validation Error:', error.errors);
      } else {
        console.error('Unknown Error:', error);
      }
      throw error;
    }
  };
  
  const useSubmitTransaction = () =>
  useMutation({
    mutationKey: ['submitTransaction'],
    mutationFn: (requestBody: RequestBody) => {
      return submitTransaction(requestBody);
    },
  });

  
   export default useSubmitTransaction;