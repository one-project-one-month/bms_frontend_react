import { useQuery } from '@tanstack/react-query';
import Axios from '../api-config';

const getUsers = async () => {
  const { data } = await Axios.get('/users');
  return data.data;
};

export const useFetchUser = <T>() => {
  return useQuery<T>({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
