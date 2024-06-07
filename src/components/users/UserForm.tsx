import React from 'react';
// import { Label } from '../ui/label';
// import { UserForm } from '../../lib/types';
import { Label } from '@/components/ui/label';
import { UserForm } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { stateCodes, townshipCodes } from '../../lib/postal';
import { useState } from 'react';
import { Button } from '../ui/Button';

interface FormProps {
  initialData?: UserForm;
  submitFn: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ initialData, submitFn }: FormProps) => {
  const [currentStateCode, setCurrentStateCode] = useState(
    initialData?.stateCode,
  );

  return (
    <div>
      <form className="container  mx-auto space-y-3  m-4" onSubmit={submitFn}>
        <div className="space-x-3 flex flex-row">
          <div className="space-y-3 flex flex-col">
            <div>
              <Label htmlFor="name">Name</Label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={initialData?.name}
                placeholder="Enter User Name"
                className="h-[35px] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-secondaryBorderColor"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={initialData?.email}
                placeholder="Enter Email"
                className="h-[35px] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-secondaryBorderColor"
              />
            </div>
            <div>
              <Label htmlFor="balance">Balance</Label>
              <input
                type="number"
                id="balance"
                name="balance"
                defaultValue={initialData?.balance ? initialData?.balance : 0}
                placeholder="Enter Balance"
                className="h-[35px] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-secondaryBorderColor"
              />
            </div>
          </div>
          <div className="space-y-3 flex flex-col">
            <div>
              <Label htmlFor="stateCode">State</Label>
              <Select
                name="stateCode"
                onValueChange={(value) => setCurrentStateCode(value)}
                defaultValue={initialData?.stateCode}
              >
                <SelectTrigger className="h-[35px] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-secondaryBorderColor">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent id="stateCode" className="h-[230px]">
                  {stateCodes.map((state) => (
                    <SelectItem key={state.StateId} value={state.StateCode}>
                      {state.StateName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="townshipCode">Township</Label>
              <Select
                name="townshipCode"
                defaultValue={initialData?.townshipCode}
              >
                <SelectTrigger className="w-[180px] h-[35px]">
                  <SelectValue placeholder="Township" />
                </SelectTrigger>
                <SelectContent id="townshipCode" className="h-[200px]">
                  {currentStateCode ? (
                    townshipCodes.map(
                      (township) =>
                        township.StateCode === currentStateCode && (
                          <SelectItem
                            key={township.TownshipId}
                            value={township.TownshipCode}
                          >
                            {township.TownshipName}
                          </SelectItem>
                        ),
                    )
                  ) : (
                    <SelectItem value="0">
                      You have to choose a State first.
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Button
          className=" w-full bg-primaryBtn hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
