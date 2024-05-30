import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from "react"
import {z} from "zod"

interface AccountField {
    name: string;
    isTouched: boolean;
}

interface Account {
    sender : AccountField;
    recipient : AccountField;
    amount : AccountField
}


const TransferPage = () => {

    const [accounts,setAccounts] = useState <Account> ({
        sender: { name: '', isTouched: false },
        recipient: { name: '', isTouched: false },
        amount: { name: '', isTouched: false },
    })

    const RequestBodySchema = z.object({
        process: z.literal('transfer'),
        data: z.object({
            sender: z.string(),
            receiver: z.string(),
            transferAmount: z.number(),
        }),
    });
    
    // Define the schema for the nested sender/receiver objects in the response data
    const PersonSchema = z.object({
        name: z.string(),
    });
    
    // Define the schema for the response data using zod
    const ResponseDataSchema = z.object({
            id: z.string().uuid(),
            amount: z.number(),
            time: z.string().datetime(),
            sender: PersonSchema,
            receiver: PersonSchema,
    });

    const errorSchema = z.object({
      message : z.string()
});
    
    // Define TypeScript types for request and response using the zod schemas
    type RequestBody = z.infer<typeof RequestBodySchema>;
    type ResponseData = z.infer<typeof ResponseDataSchema>;
    type error = z.infer<typeof errorSchema>;
    
    // Define your request body
    const convertAmount = parseInt(accounts.amount.name,10)
    
    const requestBody: RequestBody = {
        process: 'transfer',
        data: {
            sender: accounts.sender.name,
            receiver: accounts.recipient.name,
            transferAmount:convertAmount ,
        },
    };
    
    // Define your headers
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbkNvZGUiOiJibXNfMWFkNGI2N2UyYjVhN2JlNjA5MTJhYTJkNDc0ZDQxMGEiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTcwNDY4NDIsImV4cCI6MTcxNzEzMzI0Mn0.mPs5AvvZ84xRVRsn9vAMvrep6aaDHvzXTTEGeq8u-LE'
    };
    
    // Define the request configuration
    const config: AxiosRequestConfig = {
        headers: headers
    };

    const [data, setData] = useState<ResponseData | null>(null)

    const [errorMessage,setErrorMessage] = useState<error | null> (null)
    console.log(errorMessage);
    
    const handleOnChange = (field : string,value: string) :void => {
        setAccounts(prevAccounts => ({
            ...prevAccounts,
            [field]: {
                name :value,
                isTouched : true
            },
        }));
    };

    const isCompleted = Object.values(accounts).every((value)=>value.name);  

    const clickHandler = async()  => {

        try {
            // Validate the request body before making the request
            RequestBodySchema.parse(requestBody);

            const response: AxiosResponse<{ data: ResponseData }> = await axios.post<{ data: ResponseData }>(
                'https://bms-backend-nodejs.vercel.app/api/v1/admins/users/transactions',
                requestBody,
                config
            );
            // Validate the response data
            ResponseDataSchema.parse(response.data.data);
    
            console.log('Response data:', response.data.data);
            if(response.status == 200) {
                setData(response.data.data)
                setErrorMessage(null)
            }
        } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    setErrorMessage(error.response.data.message)
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    return (
        <div className="w-full bg-PrimaryBg mx-auto h-screen">
            <div className="w-full max-w-lg mx-auto mt-20">
                <form className="bg-secondaryBg border border-borderColor rounded-md px-8 pt-6 pb-8 mb-4">
                 <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sender">
                     Sender account number
                    </label>
                    <input className={`appearance-none border rounded w-full py-2 px-3 ${accounts.sender.isTouched && accounts.sender.name.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} name="sender" id="sender" type="text" placeholder="Enter sender account no." value={accounts.sender.name} onChange={(e)=> handleOnChange(e.target.name,e.target.value)} />
                    {accounts.sender.isTouched && accounts.sender.name.length ==0 && <p className="text-red-500 text-xs italic">Incomplete information.Please try again</p>}
                 </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                    Recipient account number
                    </label>
                    <input className={`appearance-none border rounded w-full py-2 px-3 ${accounts.recipient.isTouched && accounts.recipient.name.length== 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="recipient" name="recipient" type="text" placeholder="Enter recipient account no." value={accounts.recipient.name} onChange={(e)=> handleOnChange(e.target.name,e.target.value)} />
                    {accounts.recipient.isTouched && accounts.recipient.name.length ==0 && <p className="text-red-500 text-xs italic">Incomplete information.Please try again</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sender">
                     Amount
                    </label>
                    <input className={`appearance-none border rounded w-full py-2 px-3 ${accounts.amount.isTouched && accounts.amount.name.length== 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}name="amount" id="amount" type="text" placeholder="0.00" value={accounts.amount.name} onChange={(e)=> handleOnChange(e.target.name,e.target.value)} />
                    {accounts.amount.isTouched && accounts.amount.name.length ==0 && <p className="text-red-500 text-xs italic">Please enter amount</p>}
                 </div>
                <div className="flex items-center justify-between">
                <button className={`w-full ${isCompleted ? 'bg-primaryBtn hover:bg-green-700': 'bg-disabledBtn cursor-default'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="button" onClick={clickHandler}>
                   Transfer
                </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default TransferPage