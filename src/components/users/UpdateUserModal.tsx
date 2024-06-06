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

const UpdateUserModal = ({ initialData }: { initialData: UserForm }) => {
  const UpdateUserMutation = useUpdateUserMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const balance = formData.get('balance') as unknown as number;
    const stateCode = formData.get('stateCode') as string;
    const townshipCode = formData.get('townshipCode') as string;

    UpdateUserMutation.mutate({
      name,
      email,
      balance,
      stateCode,
      townshipCode,
    });
  };

  if (UpdateUserMutation.isError) {
    return <span>Error: {UpdateUserMutation.error.message}</span>;
  }

  if (UpdateUserMutation.isSuccess) {
    return <span>Post submitted!</span>;
  }

  // Getting error in form because their state and township code are not aligned with my format.

  return (
    <Dialog>
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
