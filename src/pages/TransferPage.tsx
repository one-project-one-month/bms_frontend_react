import { useState } from "react"

const TransferPage = () => {
    interface Account {
        sender : string;
        recipient : string;
        amount : string
    }

    const [accounts,setAccounts] = useState <Account> ({
        sender : '',
        recipient : '',
        amount : ''
    })

    const [touchedFields, setTouchedFields] = useState({
        sender: false,
        recipient: false,
        amount: false,
    });

    const handleOnChange = (name:string,value: string) => {
        setAccounts(prevAccounts => ({
            ...prevAccounts,
            [name]: value,
        }));
        setTouchedFields(prevTouchedFields => ({
            ...prevTouchedFields,
            [name]: true,
        }));
    };

    const isCompleted = Object.values(accounts).every(acc => acc);

    return (
        <div className="w-full bg-PrimaryBg mx-auto h-screen">
            <div className="w-full max-w-lg mx-auto mt-20">
                <form className="bg-secondaryBg border border-borderColor rounded-md px-8 pt-6 pb-8 mb-4">
                 <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sender">
                     Sender account number
                    </label>
                    <input className={`appearance-none border rounded w-full py-2 px-3 ${touchedFields.sender && accounts.sender.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} name="sender" id="sender" type="text" placeholder="Enter sender account no." value={accounts.sender} onChange={(e)=> handleOnChange(e.target.name,e.target.value)} />
                    {touchedFields.sender && accounts.sender.length ==0 && <p className="text-red-500 text-xs italic">Incomplete information.Please try again</p>}
                 </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                    Recipient account number
                    </label>
                    <input className={`appearance-none border rounded w-full py-2 px-3 ${touchedFields.recipient && accounts.recipient.length == 0 ? 'border-red-500 ' : 'border-secondaryBorderColor'} text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="recipient" name="recipient" type="text" placeholder="Enter recipient account no." value={accounts.recipient} onChange={(e)=> handleOnChange(e.target.name,e.target.value)} />
                    {touchedFields.recipient && accounts.recipient.length ==0 && <p className="text-red-500 text-xs italic">Incomplete information.Please try again</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sender">
                     Amount
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="amount" id="amount" type="text" placeholder="0.00" value={accounts.amount} onChange={(e)=> handleOnChange(e.target.name,e.target.value)} />
                    {touchedFields.amount && accounts.amount.length ==0 && <p className="text-red-500 text-xs italic">Please enter amount</p>}
                 </div>
                <div className="flex items-center justify-between">
                <button className={`w-full ${isCompleted ? 'bg-primaryBtn hover:bg-green-700': 'bg-disabledBtn'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="button">
                   Transfer
                </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default TransferPage