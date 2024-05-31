import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from "react"
import {z} from "zod"
import Inputs from './Inputs';
import check from '../../assets/check.svg'
import moment from 'moment';

const TransferPage = () => {

    const [accounts,setAccounts] = useState ({
        sender: { name: '', isTouched: false },
        recipient: { name: '', isTouched: false },
        amount: { name: '', isTouched: false },
    })

    const [data, setData] = useState<ResponseData | null>(null)

    const [success,setSuccess] = useState (false)

    const [errorMessage,setErrorMessage] = useState<error | null> (null)
    console.log(errorMessage);
    

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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbkNvZGUiOiJibXNfMWFkNGI2N2UyYjVhN2JlNjA5MTJhYTJkNDc0ZDQxMGEiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTcxNzAxNTQsImV4cCI6MTcxNzI1NjU1NH0.9rTP0JF1ouGcMQ9mjqO8rmY45Zujrylixmgpdw1v6qw'
    };
    
    // Define the request configuration
    const config: AxiosRequestConfig = {
        headers: headers
    };
    
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
                setSuccess(true)
                setErrorMessage(null)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    setErrorMessage(error.response.data)
                    setSuccess(false)
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
                        {!success && !errorMessage?.message && <Inputs accounts={accounts} handleOnChange={handleOnChange} 
                        isCompleted={isCompleted} clickHandler={clickHandler}/>}

                        {success && <div className='w-full flex flex-col items-center justify-center gap-2'>
                         <div className='w-full flex items-center justify-center gap-2'>
                            <img src={check} alt="check" />
                            <p className=' text-primaryBtn font-semibold'>Successful transfer</p>
                         </div>
                         {data?.time && (
                            <p className='text-xs text-secondaryText'>
                            {moment(data.time).format('D MMMM YYYY')}
                            </p>
                         )}
                         <p className='text-xs text-secondaryText'>Ref ID : {data?.id}</p>
                         <div className='border-b border-secondaryBorderColor w-full'></div>
                         <div className='w-full flex items-center justify-between mt-2'>
                            <p>From</p>
                            <p className=''>{data?.sender.name.toLocaleUpperCase()}</p>
                         </div>
                         <div className='w-full flex items-center justify-between mt-2'>
                            <p>To</p>
                            <p className=''>{data?.receiver.name.toLocaleUpperCase()}</p>
                         </div>
                         <div className='border-b border-secondaryBorderColor mt-2 w-full'></div>
                         <div className='w-full flex items-center justify-between mt-2'>
                            <p>Amount</p>
                            <p className=''>{data?.amount}</p>
                         </div>
                       </div>}
                    {errorMessage && <div className='w-full text-center'>{errorMessage.message}</div> }
                </form>
            </div>
        </div>
    )
}

export default TransferPage