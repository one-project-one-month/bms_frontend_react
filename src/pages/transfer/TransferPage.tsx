import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import Inputs from './Inputs';
import SuccessMessage from './SuccessMessage';
import {
  ResponseData,
  ResponseDataSchema,
  RequestBody,
  RequestBodySchema,
  error,
} from '../../lib/types';
import notallowed from '../../assets/notallowed.svg';

const TransferPage = () => {
  const [accounts, setAccounts] = useState({
    sender: { name: '', isTouched: false },
    recipient: { name: '', isTouched: false },
    amount: { name: '', isTouched: false },
  });

  const [data, setData] = useState<ResponseData | null>(null);

  const [success, setSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState<error | null>(null);
  console.log(errorMessage);

  // Define your request body
  const convertAmount = parseInt(accounts.amount.name, 10);

  const requestBody: RequestBody = {
    process: 'transfer',
    data: {
      sender: accounts.sender.name,
      receiver: accounts.recipient.name,
      transferAmount: convertAmount,
    },
  };

  // Define your headers
  const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbkNvZGUiOiJibXNfMWFkNGI2N2UyYjVhN2JlNjA5MTJhYTJkNDc0ZDQxMGEiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTcxNzAxNTQsImV4cCI6MTcxNzI1NjU1NH0.9rTP0JF1ouGcMQ9mjqO8rmY45Zujrylixmgpdw1v6qw',
  };

  // Define the request configuration
  const config: AxiosRequestConfig = {
    headers: headers,
  };

  const handleOnChange = (field: string, value: string): void => {
    setAccounts((prevAccounts) => ({
      ...prevAccounts,
      [field]: {
        name: value,
        isTouched: true,
      },
    }));
  };

  const isCompleted = Object.values(accounts).every((value) => value.name);

  const clickHandler = async () => {
    try {
      // Validate the request body before making the request
      RequestBodySchema.parse(requestBody);

      const response: AxiosResponse<{ data: ResponseData }> = await axios.post<{
        data: ResponseData;
      }>(
        'https://bms-backend-nodejs.vercel.app/api/v1/admins/users/transactions',
        requestBody,
        config,
      );
      // Validate the response data
      ResponseDataSchema.parse(response.data.data);

      console.log('Response data:', response.data.data);
      if (response.status == 200) {
        setData(response.data.data);
        setSuccess(true);
        setErrorMessage(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          setErrorMessage(error.response.data);
          setSuccess(false);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="w-full bg-PrimaryBg mx-auto h-screen">
      <div className="w-full max-w-lg mx-auto mt-20">
        <form className="bg-secondaryBg border border-borderColor rounded-md px-8 pt-6 pb-8 mb-4">
          {!success && !errorMessage?.message && (
            <Inputs
              accounts={accounts}
              handleOnChange={handleOnChange}
              isCompleted={isCompleted}
              clickHandler={clickHandler}
            />
          )}

          {success && <SuccessMessage data={data} />}
          {errorMessage && (
            <div className="w-full flex items-center justify-center gap-2">
              <img src={notallowed} alt="notallowed" className="w-4" />
              <p className="text-sm text-center text-deleteBtn">
                {errorMessage.message}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TransferPage;
