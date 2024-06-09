import { UserForm } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '@/api-config';

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (newUser: UserForm) => {
      const res = await Axios.post('/admins/users/registrations', newUser);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (userData: { username: string; data: UserForm }) => {
      const res = await Axios.put(`/users`, userData);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUserActionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user-action'],
    mutationFn: async ({
      username,
      process,
    }: {
      username: string;
      process: string;
    }) => {
      const res = await Axios.post('/users/actions', {
        username,
        process,
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
