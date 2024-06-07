import { useMutation } from '@tanstack/react-query';
import Axios from '../api-config';
import { transactionMutationBody, transactionResponse } from '../lib/types';

const transaction = async (process: string, data: transactionMutationBody['data']) => {
  const response = await Axios.post<transactionResponse>('/admins/users/transactions', {
    process,
    data
  });
  return response;
};

const useTransactionMutation = () =>
  useMutation({
    mutationKey: ['transition'],
    mutationFn: ({ process, data }: transactionMutationBody) =>  transaction(process, data)
  });

export default useTransactionMutation;
