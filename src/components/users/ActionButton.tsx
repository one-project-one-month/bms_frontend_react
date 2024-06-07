import { Button } from '../ui/Button';
import { useUserActionMutation } from '@/hooks/useUserMutation';

interface ActionButtonProps {
  username: string;
  process: string;
  changeStatus?: () => void;
}

const ActionButton = ({
  username,
  process,
  changeStatus,
}: ActionButtonProps) => {
  const UserActionMutation = useUserActionMutation();

  if (UserActionMutation.isSuccess) {
    changeStatus && changeStatus();
  }

  return (
    <Button
      onClick={() => UserActionMutation.mutate({ username, process })}
      className={
        process === 'activate'
          ? 'capitalize bg-green-700 hover:bg-green-800 text-white'
          : 'capitalize bg-[#ed2929] hover:bg-[#df1818]'
      }
    >
      {process}
    </Button>
  );
};

export default ActionButton;
