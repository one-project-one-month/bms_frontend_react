import Axios from '@/api-config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Form from '../components/users/Form';
import { UserForm } from '../lib/types';

const updateUser = async (userData: UserForm) => {
  await Axios.post(`/users`, userData);
};

const UpdateUserPage = () => {
  const mutation = useMutation({
    mutationFn: updateUser,
  });

  let {
    state: { initialData },
  }: { state: { initialData: UserForm } } = useLocation();

  useLocation;
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
    return <span>Post submitted!</span>;
  }

  // Getting error in form because their state and township code are not aligned with my format.

  return (
    <Card className="w-[500px] h-[450px] mx-auto my-[50px]">
      <CardHeader>
        <CardTitle>Update User Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Form submitFn={handleSubmit} initialData={initialData} />
      </CardContent>
    </Card>
  );
};

export default UpdateUserPage;