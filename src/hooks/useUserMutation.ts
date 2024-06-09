import { UserFormData } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '@/api-config';

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (newUser: UserFormData) => {
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
    mutationFn: async (data: { username: string; data: UserFormData }) => {
      const res = await Axios.put(`/users`, data);
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
