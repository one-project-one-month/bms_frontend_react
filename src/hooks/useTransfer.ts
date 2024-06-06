import { useMutation } from '@tanstack/react-query';
import Axios from '../api-config';
import { RequestBody,RequestBodySchema,ResponseData,ResponseDataSchema} from '../lib/types';

const endpoints = {
    transactions: 'https://bms-backend-nodejs.vercel.app/api/v1/admins/users/transactions',
  };
  
  const submitTransaction = async (requestBody: RequestBody) => {
    
    RequestBodySchema.parse(requestBody);
  
    const response : ResponseData = await Axios.post(
      endpoints.transactions,
      requestBody,
    );
  
    ResponseDataSchema.parse(response);
  
    return response;
  };
  
  const useSubmitTransaction = () =>
    useMutation({
      mutationKey: ['submitTransaction'],
      mutationFn: (requestBody: RequestBody) => {
        return submitTransaction(requestBody);
      },
    //   onSuccess: (data) => {
    //     console.log('Response data:', data);
    //     setData(data.data);  // Ensure setData is properly defined in your component
    //     setSuccess(true);  // Ensure setSuccess is properly defined in your component
    //     setErrorMessage(null);  // Ensure setErrorMessage is properly defined in your component
    //   },
    //   onError: (error) => {
    //     if (axios.isAxiosError(error)) {
    //       console.error('Axios error:', error.message);
    //       if (error.response) {
    //         console.error('Response data:', error.response.data);
    //         setErrorMessage(error.response.data);  // Ensure setErrorMessage is properly defined in your component
    //         setSuccess(false);  // Ensure setSuccess is properly defined in your component
    //       }
    //     } else {
    //       console.error('Unexpected error:', error);
    //     }
    //   },
    });
  
  export default useSubmitTransaction;