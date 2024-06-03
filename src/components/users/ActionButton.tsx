import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '../ui/button';

const ActionButton = ({
  username,
  process,
  changeStatus,
}: {
  username: string;
  process: string;
  changeStatus?: () => void;
}) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/actions`,
        {
          username,
          process,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}`,
          },
        },
      );
    },
    onSuccess() {
      changeStatus && changeStatus();
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} className="capitalize">
      {process}
    </Button>
  );
};

export default ActionButton;
