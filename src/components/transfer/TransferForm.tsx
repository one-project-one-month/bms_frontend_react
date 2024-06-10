import { UserData } from "@/lib/types";

interface AccountField {
  name: string;
  isTouched: boolean;
}

interface Account {
  sender: AccountField;
  recipient: AccountField;
  amount: AccountField;
}

interface TransferFormProps {
  accounts: Account;
  handleOnChange: (name: string, value: string) => void;
  isCompleted: boolean;
  clickHandler: () => void;
  userData : UserData[]
}

export default function TransferForm({
  accounts,
  handleOnChange,
  isCompleted,
  clickHandler,
  userData
}: TransferFormProps) {

  function findUserByName(users: UserData[], name: string,secName : string): UserData | undefined {
    return users.find(user => user.name === name || secName);
}

  const user = findUserByName(userData, accounts.sender.name,accounts.recipient.name);

  if (user) {
      console.log("User found:", user);
  } else {
      console.log("User not found");
  }
     
  return (
    <>
      <div className="mb-12">
        <div className="w-full flex items-center gap-4">
          <label
            className="text-gray-700 text-sm font-bold w-[40%]"
            htmlFor="sender"
          >
            Sender name
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 ${accounts.sender.isTouched && accounts.sender.name.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700  leading-tight focus:outline-none focus:shadow-outline`}
            name="sender"
            id="sender"
            type="text"
            placeholder="Enter sender name"
            value={accounts.sender.name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>
         {accounts.sender.isTouched && accounts.sender.name.length == 0 && (
          <p className='text-red-500 text-xs italic ml-[186px] mt-2'>
            Incomplete information.Please try again
          </p>
        )}
      </div>
      <div className="mb-12">
        <div className="w-full flex items-center gap-4">
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
            placeholder="Enter recipient name."
            value={accounts.recipient.name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>
        {accounts.recipient.isTouched &&
          accounts.recipient.name.length == 0 && (
            <p className="text-red-500 text-xs italic ml-[186px] mt-2">
              Incomplete information.Please try again
            </p>
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
            type="number"
            placeholder="0.00"
            value={accounts.amount.name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>
        {accounts.amount.isTouched && accounts.amount.name.length == 0 && (
          <p className="text-red-500 text-xs italic ml-[186px] mt-2">Please enter amount</p>
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
