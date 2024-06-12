
import { useLocation, useNavigate } from 'react-router'
import TransferSuccess from '../transfer/SuccessMessage'
import { ArrowLeft } from 'lucide-react'



const TransactionDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { data } = location.state

    return (
        <>
            <div
                className='mx-16 mt-8 w-fit px-2 flex items-center bg-primaryBtn text-white rounded-2xl cursor-pointer'
                onClick={() => navigate("..")}
            >
                <ArrowLeft size={18} />
                <p>Back</p>
            </div>
            <div className='flex m-auto  w-[400px] h-[60vh] shadow px-8 '>

                <TransferSuccess data={data} />
            </div>
        </>


    )
}

export default TransactionDetails