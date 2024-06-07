import { UserForm } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import Axios from '@/api-config';

export const useCreateUserMutation = () =>
  useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (newUser: UserForm) => {
      const res = await Axios.post('/admins/users/registrations', newUser);
      return res.data.data;
    },
  });

export const useUpdateUserMutation = () =>
  useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (userData: { username: string; data: UserForm }) => {
      const res = await Axios.put(`/users`, userData);
      return res.data.data;
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
