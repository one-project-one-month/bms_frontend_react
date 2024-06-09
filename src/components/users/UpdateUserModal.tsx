import Form from './UserForm';
import { useUpdateUserMutation } from '@/hooks/useUserMutation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserData } from '@/lib/types';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { toast } from 'react-toastify';

const UpdateUserModal = ({ initialData }: { initialData: UserData }) => {
  const [open, setOpen] = useState(false);
  const {
    mutateAsync: updateUser,
    isSuccess,
    isPending,
  } = useUpdateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    let balance = parseInt(formData.get('balance') as string);
    const stateCode = formData.get('stateCode') as string;
    const townshipCode = formData.get('townshipCode') as string;

    if (initialData?.username) {
      const res = await updateUser({
        username: initialData?.username,
        data: {
          name,
          email,
          balance,
          stateCode,
          townshipCode,
        },
      });
      if (res.data && res.status === 200) {
        toast.success(`You have successfully updated user info.`);
      } else {
        toast.error(`Updating user failed!`);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {isPending && !isSuccess ? (
            <Spinner className="mx-auto text-slate-400" />
          ) : (
            'Edit'
          )}
        </Button>
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
