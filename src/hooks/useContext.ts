import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

// Define the structure of your context state and functions
interface Account {
  name: string;
  isPressed: boolean;
}

interface AccountsState {
  sender: Account;
  recipient: Account;
  amount: Account;
}

interface MyContextType {
  accounts: AccountsState;
  updateSender: (name: string, isPressed: boolean) => void;
  updateRecipient: (name: string, isPressed: boolean) => void;
  updateAmount: (name: string, isPressed: boolean) => void;
}

const defaultValue: MyContextType = {
  accounts: {
    sender: { name: '', isPressed: false },
    recipient: { name: '', isPressed: false },
    amount: { name: '', isPressed: false },
  },
  updateSender: () => {},
  updateRecipient: () => {},
  updateAmount: () => {},
};

const MyContext = createContext<MyContextType>(defaultValue);

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState<AccountsState>({
    sender: { name: '', isPressed: false },
    recipient: { name: '', isPressed: false },
    amount: { name: '', isPressed: false },
  });

  const updateSender = (name: string, isPressed: boolean) => {
    setAccounts(prevAccounts => ({
      ...prevAccounts,
      sender: { name, isPressed },
    }));
  };

  const updateRecipient = (name: string, isPressed: boolean) => {
    setAccounts(prevAccounts => ({
      ...prevAccounts,
      recipient: { name, isPressed },
    }));
  };

  const updateAmount = (name: string, isPressed: boolean) => {
    setAccounts(prevAccounts => ({
      ...prevAccounts,
      amount: { name, isPressed },
    }));
  };

  return (
    <MyContext.Provider value={{ accounts, updateSender, updateRecipient, updateAmount }}>
    {children}
  </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
