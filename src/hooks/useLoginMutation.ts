import { useMutation } from '@tanstack/react-query';
import Axios from '../api-config';
import { endpoints } from '../lib/constants';
import { ResponseDataType } from '../lib/types';

type LoginResponseType = ResponseDataType<{
  // todo : need to define the type of response data only token or with role
  token: string;
}>;

const login = async (
  email: string,
  password: string,
): Promise<LoginResponseType> => {
  const response = await Axios.post<LoginResponseType>(endpoints.staff.login, {
    email,
    password,
  });
  return response.data;
};

type LoginMutationParams = {
  email: string;
  password: string;
};

const useLoginMutation = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: async (params: LoginMutationParams) =>
      login(params.email, params.password),
  });

export default useLoginMutation;
