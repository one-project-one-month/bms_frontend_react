import { UserData } from "@/lib/types";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/store";
import { setSenderUsername,setRecipientUsername } from "@/store/slices/usernamesSlice";

interface AccountField {
  name: string;
  isTouched: boolean;
}

interface Account {
  sender: AccountField;
  recipient: AccountField;
  amount: AccountField;
}

type SetAccounts = React.Dispatch<React.SetStateAction<Account>>;


interface TransferFormProps {
  accounts: Account;
  handleOnChange: (name: string, value: string) => void;
  isCompleted: boolean;
  clickHandler: () => void;
  userData : UserData[];
  setAccounts : SetAccounts;
}

export default function TransferForm({
  accounts,
  handleOnChange,
  isCompleted,
  clickHandler,
  userData,
  setAccounts,
}: TransferFormProps) {

  const[isOpened,setIsOpened] = useState (false)
  const[isShowed,setIsShowed] = useState (false)
  const[senders,setSenders] = useState <UserData[]>  ([])
  const[recipients,setRecipients] = useState <UserData[]>  ([])
  const[senderBalance,setSenderBalance] = useState (0)
  const[recipientBalance,setRecipientBalance] = useState (0)
  const [lastValue, setLastValue] = useState<string>('');
  const [senderLoading,setSenderLoading] = useState (false)
  const [recipientLoading,setRecipientoading] = useState (false)
  const dispatch: AppDispatch = useDispatch();
  const [selectSender,setSelectSender] = useState (true)
  const [selectRecipient,setSelectRecipient] = useState (true)
  
  function findSenderByName(users: UserData[], name: string): UserData[] { 
    const filterData = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()) && (user.isDeactivated == false && user.isDeleted==false));
    return filterData.sort((a, b) => a.name.localeCompare(b.name));

  }

  function findRecipientByName (users: UserData[], name: string): UserData[] {
    const filterData = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()) && (user.isDeactivated == false && user.isDeleted==false));
    return filterData.sort((a, b) => a.name.localeCompare(b.name));
  }

  useEffect(() => {
    if (accounts.sender.name && selectSender) {
      setIsOpened(true);
      setSenderLoading(true); 
      const timeoutId = setTimeout(() => {
        const filteredSenders = findSenderByName(userData, accounts.sender.name);
        setSenders(filteredSenders);
        setSenderLoading(false);
      }, 1500); 
      return () => clearTimeout(timeoutId);
    } else {
      setIsOpened(false);
    }
  }, [accounts.sender.name, selectSender, userData]);
  
  

  useEffect(() => {
    if (accounts.recipient.name.length > 0 && selectRecipient) {
      setIsShowed(true);
      setRecipientoading(true); 
      const timeoutId = setTimeout(() => {
        const filteredRecipients = findRecipientByName(userData, accounts.recipient.name);
        setRecipients(filteredRecipients);
        setRecipientoading(false);
      }, 1500); 
      return () => clearTimeout(timeoutId);
    } else {
      setIsShowed(false);
    }
  }, [accounts.recipient.name, selectRecipient, userData]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.type = 'number';
    event.target.value = lastValue || '';
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.type = 'text';
    setLastValue(event.target.value);
    event.target.value = event.target.value === '' ? '' : (+event.target.value).toLocaleString();
  };

  const getSenderUsername = (gg : UserData ) => {
    setAccounts((prevAccounts) => ({
      ...prevAccounts,
      sender: {
        name: gg.name,
        isTouched: true,
      }
    }));
    setSelectSender (false)
    setSenderBalance(gg.balance)
    dispatch(setSenderUsername(gg.username ?? '') )
    setIsOpened(false)
  }

  const getRecipientUsername = (gg :UserData) => {
    setAccounts((prevAccounts) => ({
      ...prevAccounts,
      recipient: {
        name: gg.name,
        isTouched: true,
      }
    }));
    setSelectRecipient (false)
    dispatch(setRecipientUsername(gg.username ?? '') )
    setRecipientBalance(gg.balance)
    setIsShowed(false)
  }

  useEffect(() => {
    if(accounts.sender.name.length == 0) {
      setSelectSender(true)
    }

  }, [accounts.sender.name])

  useEffect(() => {
    if(accounts.recipient.name.length == 0) {
      setSelectRecipient(true)
    }

  }, [accounts.recipient.name])
  
  console.log(senders.length);
  
  return (
    <>
      <div className="mb-12 relative">
        <div className="w-full flex items-center gap-4 relative">
          <label
            className="text-gray-700 text-sm font-bold w-[40%]"
            htmlFor="sender"
          >
            Sender name
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 ${accounts.sender.isTouched && accounts.sender.name.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            name="sender"
            id="sender"
            type="text"
            placeholder="Enter sender name"
            value={accounts.sender.name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
          {isOpened && senders.length > 0 && !senderLoading && (
          <div className="w-[400px] ml-[182px] max-h-[240px] overflow-y-auto shadow z-50 bg-white border border-borderColor rounded p-2 top-[45px] absolute">
            {senders.length > 0 && !senderLoading && senders.map((sender: UserData) => (
              <div key={sender.id} className='text-left'>
                <p className="text-sm hover:bg-slate-100 p-1 rounded-sm cursor-pointer" onClick={()=>getSenderUsername(sender)}>{` ${sender.name} (${sender.username})`}</p>
              </div>
            ))}
          </div>
          )}
        </div>
         {accounts.sender.isTouched && accounts.sender.name.length == 0 && (
          <p className='text-red-500 text-xs italic ml-[183px] mt-2'>
            Incomplete information.Please try again
          </p>
        )}
        {accounts.sender.isTouched  && accounts.sender.name.length >= 1 && senders.length == 0 && !senderLoading &&  (
          <div className="w-fit mx-auto ml-[182px] max-h-30 overflow-y-auto shadow z-50 bg-white border border-borderColor rounded p-2 top-[45px] absolute">
            <p className='text-red-500 text-xs'>No senders found</p>
          </div>
        )}
        {senderLoading &&  accounts.sender.name.length >= 1 && (
          <div className="w-[400px] mx-auto ml-[182px] max-h-30 shadow z-50 bg-white border border-borderColor rounded px-2 py-1 top-[45px] absolute">
           <Spinner className="mx-auto text-slate-400 text-xs" />
          </div>
        )}
        {senderBalance >= 0 && accounts.sender.name.length > 0 && senders.length>0 &&  (
          <p className='text-slate-500 text-xs ml-[183px] mt-2'>Total Balance : {senderBalance}</p>
        )}
      </div>
      <div className="mb-12 relative">
        <div className="w-full flex items-center gap-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold w-[40%]"
            htmlFor="recipient"
          >
            Recipient name
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 ${accounts.recipient.isTouched && accounts.recipient.name.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="recipient"
            name="recipient"
            type="text"
            placeholder="Enter recipient name"
            value={accounts.recipient.name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
          {isShowed && recipients.length > 0 && !recipientLoading && (
          <div  className="w-[400px] ml-[182px] max-h-[240px] overflow-y-auto shadow z-50 bg-white border border-borderColor rounded p-2 top-[45px] absolute">
            {recipients.length > 0 && !recipientLoading && recipients.map((recipient: UserData) => (
              <div key={recipient.id} className='text-left'>
                <p className="text-sm hover:bg-slate-100 p-1 rounded-sm cursor-pointer" onClick={()=>getRecipientUsername(recipient)}>{` ${recipient.name} (${recipient.username})`}</p>
              </div>
            ))}
          </div>
          )}
        </div>
        {accounts.recipient.isTouched &&
          accounts.recipient.name.length == 0 && (
            <p className="text-red-500 text-xs italic ml-[183px] mt-2">
              Incomplete information.Please try again
            </p>
          )}
           {accounts.recipient.isTouched  && accounts.recipient.name.length >= 1 && recipients.length == 0 && !recipientLoading && (
            <div className="w-fit mx-auto ml-[182px] max-h-30 overflow-y-auto shadow z-50 bg-white border border-borderColor rounded p-2 top-[45px] absolute">
              <p className='text-red-500 text-xs'>No recipients found</p>
            </div>
            )}
          {recipientLoading &&  accounts.recipient.name.length >= 1 && (
          <div className="w-[400px] mx-auto ml-[182px] max-h-30 shadow z-50 bg-white border border-borderColor rounded px-2 py-1 top-[45px] absolute">
           <Spinner className="mx-auto text-slate-400 text-xs" />
          </div>
        )}
          {recipientBalance >= 0 && accounts.recipient.name.length > 0 && recipients.length > 0 && (
          <p className='text-slate-500 text-xs ml-[183px] mt-2'>Total Balance : {recipientBalance}</p>
        )}
      </div>
      <div className="mb-8">
        <div className="w-full flex items-center gap-4">
          <label
            className="block text-gray-700 text-sm font-bold w-[40%]"
            htmlFor="sender"
          >
            Amount
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 ${accounts.amount.isTouched && accounts.amount.name.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            name="amount"
            id="amount"
            type="text"
            placeholder="0.00"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>
        {accounts.amount.isTouched && accounts.amount.name.length == 0 && (
          <p className="text-red-500 text-xs italic ml-[183px] mt-2">Please enter amount</p>
        )}
        {senderBalance === 0 && accounts.sender.name.length > 0 && !senderLoading && senders.length > 0 && !selectSender &&  (
          <p className='text-red-500 text-xs ml-[183px] mt-2'>Insufficient balance.Please select another account.</p>
        )}
      </div>
      <div className="w-full text-right">
        <button
          className={`${isCompleted ? 'bg-primaryBtn hover:bg-green-700' : 'bg-disabledBtn cursor-default'} text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline`}
          type="button"
          onClick={clickHandler}
        >
          Transfer
        </button>
      </div>
    </>
  );
}
