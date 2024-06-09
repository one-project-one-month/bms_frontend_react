import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserData, UserNameList } from '../lib/types';

import useTransactionMutation from './useTransactionMutation';
import { useFetchUser } from './useFetchUser';

const formSchema = z.object({
  account: z.string().min(1,{message: 'Please select an account.'}),
  amount: z.coerce.number().min(2, "Amount must be at least 2")
})

const useTransactionForm = (process: 'deposit' | 'withdraw') => {
    const [open, setOpen] = useState(false);
    const [userNameList, setUserNameList] = useState<UserNameList[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          account: '',
          amount: 0
        }
    })

    const {data, isLoading, isSuccess,isError, error} = useFetchUser<UserData[]>();
    
    const { mutateAsync: deposit, isPending }= useTransactionMutation();

    useEffect(() => {
        if (isSuccess && data) {          
            const nameList = data.filter(user => !user.isDeactivated && !user.isDeleted).map(user => (
              {
                value: user.username!,
                label: user.username!
              }
            ))
            setUserNameList(nameList)
        } else if (isError) {
            console.log(error);
        }
    }, [
        isError,
        isSuccess,
        isPending,
    ]);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const { account, amount } = values;
       try{
        const response = await deposit({
            process,
            data: {
              username: account,
              amount,
            },
          });
          
          if(response.data && response.status === 200){
              form.reset();
              toast.success(`You have successfully ${process}ed.`)
          }
       }catch (error) {
            if (typeof error === 'object' && error && 'response' in error && error.response) {
                const responseWithData = error.response as { data: any };
          
                if (responseWithData.data && responseWithData.data.message) {
                  const errorMsg = responseWithData.data.message;
                  toast.error(errorMsg);
                } else {
                  console.error("An error occurred:", error);
                }
        }
      }
    }

  return {
    form,
    open,
    setOpen,
    userNameList,
    isPending,
    isLoading,
    handleSubmit
  }
}

export default useTransactionForm