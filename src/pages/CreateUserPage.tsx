import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Form from '../components/users/Form';
import { UserForm } from '../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const createUser = async (newUser: UserForm) => {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/admins/users/registrations`,
    newUser,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}` },
    },
  );
};

const CreateUserPage = () => {
  const mutation = useMutation({
    mutationFn: createUser,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let name = formData.get('name') as string;
    let email = formData.get('email') as string;
    let balance = formData.get('balance') as unknown as number;
    let stateCode = formData.get('stateCode') as string;
    let townshipCode = formData.get('townshipCode') as string;

    mutation.mutate({
      name,
      email,
      balance,
      stateCode,
      townshipCode,
    });
  };

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>User Created!</span>;
  }

  return (
    <Card className="w-[500px] h-[400px] mx-auto my-[50px]">
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
      </CardHeader>
      <CardContent>
        <Form submitFn={handleSubmit} />
      </CardContent>
    </Card>
  );
};

export default CreateUserPage;
