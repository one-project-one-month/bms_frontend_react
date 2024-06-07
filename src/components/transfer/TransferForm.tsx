import React from "react";
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
}

export default function TransferForm({
  accounts,
  handleOnChange,
  isCompleted,
  clickHandler,
}: TransferFormProps) {
  return (
    <>
      <div className="mb-8">
        <div className="w-full flex items-center gap-4">
          <label
            className="text-gray-700 text-sm font-bold w-[30%]"
            htmlFor="sender"
          >
            Sender account number
          </label>
          <input
            className={`appearance-none border rounded w-[40%] py-2 px-3 ${accounts.sender.isTouched && accounts.sender.name.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            name="sender"
            id="sender"
            type="text"
            placeholder="Enter sender account no."
            value={accounts.sender.name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>
         {accounts.sender.isTouched && accounts.sender.name.length == 0 && (
          <p className='text-red-500 text-xs italic ml-[336px]'>
            Incomplete information.Please try again
          </p>
        )}
      </div>
      <div className="mb-8">
        <div className="w-full flex items-center gap-4">
          <label
            className="block text-gray-700 text-sm font-bold w-[30%]"
            htmlFor="recipient"
          >
            Recipient account number
          </label>
          <input
            className={`appearance-none border rounded w-[40%] py-2 px-3 ${accounts.recipient.isTouched && accounts.recipient.name.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="recipient"
            name="recipient"
            type="text"
            placeholder="Enter recipient account no."
            value={accounts.recipient.name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>
        {accounts.recipient.isTouched &&
          accounts.recipient.name.length == 0 && (
            <p className="text-red-500 text-xs italic ml-[336px]">
              Incomplete information.Please try again
            </p>
          )}
      </div>
      <div className="mb-8">
        <div className="w-full flex items-center gap-4">
          <label
            className="block text-gray-700 text-sm font-bold w-[30%]"
            htmlFor="sender"
          >
            Amount
          </label>
          <input
            className={`appearance-none border rounded w-[40%] py-2 px-3 ${accounts.amount.isTouched && accounts.amount.name.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            name="amount"
            id="amount"
            type="number"
            placeholder="0.00"
            value={accounts.amount.name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>
        {accounts.amount.isTouched && accounts.amount.name.length == 0 && (
          <p className="text-red-500 text-xs italic ml-[336px]">Please enter amount</p>
        )}
      </div>
      <div className="w-[72%] text-right">
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
