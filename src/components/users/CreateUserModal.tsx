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

const CreateUserModal = () => {
  const CreateUserMutation = useCreateUserMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let name = formData.get('name') as string;
    let email = formData.get('email') as string;
    let balance = formData.get('balance') as unknown as number;
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

  // if (mutation.isError) {
  //   return <span>Error: {mutation.error.message}</span>;
  // }

  if (CreateUserMutation.isSuccess) {
    return <span>User Created!</span>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='float-right me-5' variant="outline">Create</Button>
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
