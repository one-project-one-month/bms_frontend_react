import { useQuery } from '@tanstack/react-query';
import Axios from '../api-config';

const getTransaction = async <T>() => {
  const { data } = await Axios.get<T>('/transactions');
  return data;
};

export const useTransactionHistory = <T>() => {
  return useQuery<T>({
    queryKey: ['transaction'],
    queryFn: getTransaction,
  });
};
