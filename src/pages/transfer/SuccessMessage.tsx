import check from '../../assets/check.svg'
import moment from 'moment';
import { ResponseData } from '../../lib/types';

interface SuccessMessageProps {
    data: ResponseData | null;
  }

const SuccessMessage = ({data}:SuccessMessageProps) => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-2'>
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
        <p className=' font-semibold'>{data?.sender.name.toLocaleUpperCase()}</p>
        </div>
        <div className='w-full flex items-center justify-between mt-2'>
        <p>To</p>
        <p className='font-semibold'>{data?.receiver.name.toLocaleUpperCase()}</p>
        </div>
        <div className='border-b border-secondaryBorderColor mt-2 w-full'></div>
        <div className='w-full flex items-center justify-between mt-2'>
        <p>Amount</p>
        <p className='font-semibold'>{data?.amount}</p>
        </div>
    </div>
  )
}

export default SuccessMessage