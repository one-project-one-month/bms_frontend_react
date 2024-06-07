import Form from './UserForm';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { UserForm } from '@/lib/types';

import { useCreateUserMutation } from '@/hooks/useUserMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const CreateUserModal = ({
  userData,
  setUserData,
}: {
  userData: UserForm[];
  setUserData: Dispatch<SetStateAction<UserForm[] | undefined>>;
}) => {
  const [open, setOpen] = useState(false);
  const CreateUserMutation = useCreateUserMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let name = formData.get('name') as string;
    let email = formData.get('email') as string;
    let balance = parseInt(formData.get('balance') as string);
    let stateCode = formData.get('stateCode') as string;
    let townshipCode = formData.get('townshipCode') as string;

    CreateUserMutation.mutate({
      name,
      email,
      balance,
      stateCode,
      townshipCode,
    });
  };

  // I think there is still something wrong with this effect
  useEffect(() => {
    if (CreateUserMutation.isSuccess) {
      setUserData([CreateUserMutation.data, ...userData]);
      setOpen(false);
    }
  }, [CreateUserMutation.isSuccess]);

  if (CreateUserMutation.isError) {
    console.log(CreateUserMutation.isError);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="float-right me-5" variant="outline">
          Create New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <Form submitFn={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
