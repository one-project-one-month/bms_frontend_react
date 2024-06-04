import { useMutation } from '@tanstack/react-query';
import Axios from '../api-config';
import { endpoints } from '../lib/constants';
import { LoginMutationParams, LoginResponseType } from '../lib/types';

const login = async (adminCode: string, password: string) => {
  const response = await Axios.post<LoginResponseType>(endpoints.staff.login, {
    adminCode,
    password,
  });
  return response.data;
};

const useLoginMutation = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: ({ adminCode, password }: LoginMutationParams) => {
      return login(adminCode, password);
    },
  });

export default useLoginMutation;
