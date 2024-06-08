import { useQuery } from '@tanstack/react-query';
import Axios from '../api-config';
import { UserListResponse } from '@/lib/types';

const getUsers = async () => {
  const response = await Axios.get<UserListResponse>('/users');
  return response;
};

export const useUserAccounts = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
