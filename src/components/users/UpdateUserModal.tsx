import Form from './UserForm';
import { useUpdateUserMutation } from '@/hooks/useUserMutation';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserForm } from '@/lib/types';
import { Dispatch, SetStateAction, useState } from 'react';

const UpdateUserModal = ({
  initialData,
  userData,
  setUserData,
}: {
  initialData: UserForm;
  userData: UserForm[];
  setUserData: Dispatch<SetStateAction<UserForm[] | undefined>>;
}) => {
  const [open, setOpen] = useState(false);
  const UpdateUserMutation = useUpdateUserMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    let balance = parseInt(formData.get('balance') as string);
    const stateCode = formData.get('stateCode') as string;
    const townshipCode = formData.get('townshipCode') as string;

    initialData?.username &&
      UpdateUserMutation.mutate({
        username: initialData?.username,
        data: {
          name,
          email,
          balance,
          stateCode,
          townshipCode,
        },
      });
  };

  if (UpdateUserMutation.isSuccess && UpdateUserMutation.data) {
    setUserData(
      userData.map((user) => {
        if (user.username === UpdateUserMutation.data.username) {
          return UpdateUserMutation.data;
        } else {
          return user;
        }
      }),
    );
    setOpen(false);
  }

  if (UpdateUserMutation.isError) {
    return <span>Error: {UpdateUserMutation.error.message}</span>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update New User</DialogTitle>
        </DialogHeader>
        <Form submitFn={handleSubmit} initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
