import { useState } from "react"

const TransferPage = () => {
    interface Account {
        sender : string;
        recipient : string;
    }

    const [accounts,setAccounts] = useState <Account> ({
        sender : '',
        recipient : ''
    })

    const handleOnChange = (name:string,value: string) => {
        setAccounts(prevAccounts => ({
            ...prevAccounts,
            [name]: value,
        }));
    };

    return (
        <div className="w-full bg-PrimaryBg mx-auto h-screen">
            <div className="w-full max-w-lg mx-auto mt-20">
                <form className="bg-secondaryBg border border-borderColor rounded-md px-8 pt-6 pb-8 mb-4">
                 <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sender">
                     Sender account no.
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="sender" id="username" type="text" placeholder="Enter sender account no." value={accounts.sender} onChange={(e)=> handleOnChange(e.target.name,e.target.value)} />
                 </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                    Recipient account no.
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="recipient" type="text" placeholder="Enter recipient account no." value={accounts.recipient} onChange={(e)=> handleOnChange(e.target.name,e.target.value)}/>
                    {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div className="flex items-center justify-between">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                   Review
                </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default TransferPage