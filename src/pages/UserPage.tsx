import axios from 'axios';
import { UserForm } from '../lib/types';
import { useQuery } from '@tanstack/react-query';
import SingleUser from '@/components/users/SingleUser';

const getUsers = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}` },
  });

  return res.data.data;
};

const UserPage = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({ queryKey: ['getUsers'], queryFn: getUsers });

  if (isLoading) return <div>Fetching users...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>User Page</h1>
      <div className="flex flex-col space-y-3">
        {users?.map((user: UserForm) => (
          <SingleUser key={user.username} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
