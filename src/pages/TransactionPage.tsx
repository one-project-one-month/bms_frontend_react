import { UseFormReturn } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/card'

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import useTransactionForm from '../hooks/useTransactionForm';
import { UserNameList } from '../lib/types';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface FormProps {
  form: UseFormReturn<{ account: string, amount: number }, any, undefined>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userNameList: UserNameList[];
  isPending: boolean;
  isLoading: boolean;
  handleSubmit: (values: { account: string, amount: number }) => void;
}

const TransactionPage = () => {
  const depositForm = useTransactionForm('deposit');
  const withdrawForm = useTransactionForm('withdraw');

  const renderForm = (formProps: FormProps) => {
    const { form, open, setOpen, userNameList, isPending, handleSubmit, isLoading } = formProps;

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete='off'>
          <CardContent className='space-y-2'>
            <FormField control={form.control} name='account' render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>User Account Number</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={
                          cn(
                            "justify-between", !field.value && "text-muted-foreground"
                          )
                        }
                      >
                        {field.value
                          ? userNameList.find((name) => name.value === field.value)?.label
                          : "Select User Account"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search User Account" />
                      <CommandList>
                        {
                          isLoading ? <p className='text-center font-bold py-4'>Loading...</p> : (
                            <>
                              <CommandEmpty>No Account Name found.</CommandEmpty>
                              <CommandGroup>
                                <>
                                  {userNameList.map((name) => (
                                    <CommandItem
                                      key={name.value}
                                      value={name.value}
                                      onSelect={() => {
                                        form.setValue("account", name.value),
                                          setOpen(false)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === name.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {name.label}
                                    </CommandItem>
                                  ))}
                                </>
                              </CommandGroup>
                            </>

                          )
                        }
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}>
            </FormField>
            <FormField control={form.control} name='amount' render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type='number' step="1" min="1" placeholder='0.00' {...field} className="border-gray-200 shadow-none focus:border-none focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-gray-300 sm:text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}>
            </FormField>
          </CardContent>
          <CardFooter className='justify-center'>
            <Button type='submit' disabled={isPending}>{isPending ? 'Loading...' : 'Submit'}</Button>
          </CardFooter>
        </form>
      </Form>
    )

  }

  return (
    <div className='w-2/5 mx-auto mt-20'>
      <Tabs defaultValue='deposit' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='deposit'>Deposit</TabsTrigger>
          <TabsTrigger value='withdraw'>Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value='deposit'>
          <Card>
            <CardHeader>
              <CardTitle>Deposit</CardTitle>
              <CardDescription>Add funds to your account easily and quickly.</CardDescription>
            </CardHeader>
            {
              renderForm(depositForm)
            }
          </Card>
        </TabsContent>
        <TabsContent value='withdraw'>
          <Card>
            <CardHeader>
              <CardTitle>Withdraw</CardTitle>
              <CardDescription>Withdraw funds from your account securely and quickly.</CardDescription>
            </CardHeader>
            {
              renderForm(withdrawForm)
            }
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TransactionPage