import { UserForm } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import Axios from '@/api-config';

export const useCreateUserMutation = () =>
  useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (newUser: UserForm) => {
      await Axios.post('/admins/users/registrations', newUser);
    },
  });

export const useUpdateUserMutation = () =>
  useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (userData: UserForm) => {
      await Axios.post(`/users`, userData);
    },
  });

export const useUserActionMutation = () =>
  useMutation({
    mutationKey: ['user-action'],
    mutationFn: async ({
      username,
      process,
    }: {
      username: string;
      process: string;
    }) => {
      return await Axios.post('/users/actions', {
        username,
        process,
      });
    },
  });
