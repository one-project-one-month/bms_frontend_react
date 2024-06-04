import React from 'react';
import { Input } from '../ui/Input';
import { Label } from '../ui/label';
import { Button } from '../ui/Button';
import { UserForm } from '../../lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { stateCodes, townshipCodes } from '../../lib/postal';
import { useState } from 'react';

const Form = ({
  initialData,
  submitFn,
}: {
  initialData?: UserForm;
  submitFn: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
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
              <Input
                type="text"
                id="name"
                name="name"
                defaultValue={initialData?.name}
                className="border-black h-[35px]"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                defaultValue={initialData?.email}
                className="border-black  h-[35px]"
              />
            </div>
            <div>
              <Label htmlFor="balance">Balance</Label>
              <Input
                type="number"
                id="balance"
                name="balance"
                defaultValue={initialData?.balance ? initialData?.balance : 0}
                className="border-black  h-[35px]"
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
                <SelectTrigger className="w-[180px] h-[35px]">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent id="stateCode">
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
                <SelectContent id="townshipCode">
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Form;
