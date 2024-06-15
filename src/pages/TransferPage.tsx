import { useState, useEffect } from 'react';
import SuccessMessage, {
  TranscationData,
} from '../components/transfer/SuccessMessage';
import TransferForm from '../components/transfer/TransferForm';
import { RequestBody } from '../lib/types';
import useSubmitTransaction from '../hooks/useTransfer';
import { useFetchUser } from '@/hooks/useFetchUser';
import { UserData } from '../lib/types';

// Icons components
const NotAllowed = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#f44336"
      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
    />
    <path
      fill="#fff"
      d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
    />
    <path
      fill="#fff"
      d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#2196f3"
      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
    />
    <path
      fill="#fff"
      d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14s2.5 1.121 2.5 2.5z"
    />
  </svg>
);

const TransferPage = () => {
  const [accounts, setAccounts] = useState({
    sender: { name: '', isTouched: false },
    recipient: { name: '', isTouched: false },
    amount: { name: '', isTouched: false },
  });

  const [data, setData] = useState<TranscationData | null>(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const users = useFetchUser<UserData>();
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    if (users.isSuccess && users.data) {
      const sortedData = users.data.sort(
        (a: { id: number }, b: { id: number }) => (a.id < b.id ? -1 : 1),
      );
      setUserData(sortedData);
    } else if (users.isError) {
      console.log(users.error);
    }
  }, [users.data, users.isError, users.isSuccess]);

  const convertAmount = parseInt(accounts.amount.name, 10);

  const handleOnChange = (field: string, value: string): void => {
    setAccounts((prevAccounts) => ({
      ...prevAccounts,
      [field]: {
        name: value,
        isTouched: true,
      },
    }));
  };


  const getSenderUsername : string = userData.find(user => user.name === accounts.sender.name)?.username ?? '';

  const getRecipientUsername : string = userData.find(user => user.name === accounts.recipient.name)?.username ?? '';

  
  const body: RequestBody = {
    process: 'transfer',
    data: {
      sender: getSenderUsername,
      receiver: getRecipientUsername,
      transferAmount: convertAmount,
    },
  };

  const submitTransactionMutation = useSubmitTransaction();
  
  useEffect(() => {
    if (submitTransactionMutation.isSuccess && submitTransactionMutation.data) {
      console.log('Mutation Success Data:', submitTransactionMutation);
      setData(submitTransactionMutation.data.data);
      setSuccess(true);
      setLoading(false);
    } else if (submitTransactionMutation.isPending) {
      setLoading(true);
    } else if (submitTransactionMutation.isError) {
      console.log('Mutation Error:', submitTransactionMutation.error.response.data.message);
      setErrorMessage(submitTransactionMutation.error.response.data.message);
      setLoading(false);
    }
  }, [
    submitTransactionMutation.isError,
    submitTransactionMutation.isSuccess,
    submitTransactionMutation.isPending,
  ]);

  const clickHandler = () => {
    if (isCompleted) {
      submitTransactionMutation.mutate(body);
    }
  };

  const isCompleted =
    accounts.sender.isTouched &&
    accounts.recipient.isTouched &&
    accounts.amount.isTouched;  

  return (
    <div className="w-full mx-auto h-screen">
      <div className={`max-w-2xl ${success || errorMessage || loading ? 'mx-auto mt-20 max-w-sm' : 'mt-8'}`}>
        <form className="bg-PrimaryBg border border-secondaryBorderColor rounded-md px-8 pt-6 pb-6">
          {!success && !errorMessage && !loading && (
            <TransferForm accounts={accounts} handleOnChange={handleOnChange} isCompleted={isCompleted} clickHandler={clickHandler} userData={userData} setAccounts ={setAccounts} />
          )}

          {success && <SuccessMessage data={data} />}

          {loading && (
            <div className="w-full flex items-center justify-center gap-2">
              <InfoIcon />
              <p className="text-sm text-center">Submitting the transfer...</p>
            </div>
          )}
          {errorMessage && (
            <div className="w-full flex items-center justify-center gap-2">
              <NotAllowed />
              <p className="text-sm text-center text-deleteBtn">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TransferPage;
