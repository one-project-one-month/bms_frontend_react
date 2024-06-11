
import { useLocation } from 'react-router'
import TransferSuccess from '../transfer/SuccessMessage'

const TransactionDetails = () => {
    const location = useLocation()
    const { data } = location.state

    return (
        <div className='flex m-auto  w-[400px] h-[80vh] shadow px-8 '>
            <TransferSuccess data={data} />
        </div>

    )
}

export default TransactionDetails