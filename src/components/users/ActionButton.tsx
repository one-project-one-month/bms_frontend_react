import { Button } from '@/components/ui//button';
import { useUserActionMutation } from '@/hooks/useUserMutation';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'react-toastify';

interface ActionButtonProps {
  username: string;
  process: string;
}

const ActionButton = ({ username, process }: ActionButtonProps) => {
  const {
    mutateAsync: userAction,
    isPending,
    isSuccess,
  } = useUserActionMutation();

  return isPending && !isSuccess ? (
    <Spinner className="mx-auto text-slate-400" />
  ) : (
    <Button
      onClick={async () => {
        const res = await userAction({ username, process });
        if (res.data && res.status === 200) {
          toast.success(`You have successfully ${process}d the user.`);
        } else {
          toast.error(`${process} failed!`);
        }
      }}
      className={
        process === 'activate'
          ? 'capitalize bg-green-700 hover:bg-green-800 text-white mx-auto'
          : 'capitalize bg-[#ed2929] hover:bg-[#df1818] mx-auto'
      }
    >
      {process}
    </Button>
  );
};

export default ActionButton;
