import Form from './UserForm';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/Button';

import { useCreateUserMutation } from '@/hooks/useUserMutation';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'react-toastify';

const CreateUserModal = () => {
  const [open, setOpen] = useState(false);
  const {
    mutateAsync: createUser,
    isSuccess,
    isPending,
  } = useCreateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);

    const formData = new FormData(e.currentTarget);
    let name = formData.get('name') as string;
    let email = formData.get('email') as string;
    let balance = parseInt(formData.get('balance') as string);
    let stateCode = formData.get('stateCode') as string;
    let townshipCode = formData.get('townshipCode') as string;

    const res = await createUser({
      name,
      email,
      balance,
      stateCode,
      townshipCode,
    });

    if (res.data && res.status === 201) {
      toast.success(`You have successfully created the user.`);
    } else {
      toast.error(`Creating user failed!`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="float-right me-5" variant="outline">
          {isPending && !isSuccess ? (
            <Spinner className="mx-auto text-slate-400" />
          ) : (
            ' Create New User'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <Form submitFn={handleSubmit} showBalance={true} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
