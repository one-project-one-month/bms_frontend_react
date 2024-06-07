import moment from 'moment';

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 256 256"
    width="24px"
    height="24px"
  >
    <g fill="#52e091" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
      <g transform="scale(10.66667,10.66667)">
        <path d="M12,2c-5.523,0 -10,4.477 -10,10c0,5.523 4.477,10 10,10c5.523,0 10,-4.477 10,-10c0,-5.523 -4.477,-10 -10,-10zM10,17.414l-4.707,-4.707l1.414,-1.414l3.293,3.293l7.293,-7.293l1.414,1.414z"></path>
      </g>
    </g>
  </svg>
);


function TransferSuccess({ data }) {

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <div className="w-full flex items-center justify-center gap-2">
        <CheckIcon />
        <p className=" text-primaryBtn font-semibold">Successful transfer</p>
      </div>
      {data?.time && (
        <p className="text-xs text-secondaryText">
          {moment(data.time).format('D MMMM YYYY')}
        </p>
      )}
      <p className="text-xs text-secondaryText">Ref ID : {data?.id}</p>
      <div className="border-b border-secondaryBorderColor w-full"></div>
      <div className="w-full flex items-center justify-between mt-2">
        <p>From</p>
        <p className=" font-semibold">
          {data?.sender.name.toLocaleUpperCase()}
        </p>
      </div>
      <div className="w-full flex items-center justify-between mt-2">
        <p>To</p>
        <p className="font-semibold">
          {data?.receiver.name.toLocaleUpperCase()}
        </p>
      </div>
      <div className="border-b border-secondaryBorderColor mt-2 w-full"></div>
      <div className="w-full flex items-center justify-between mt-2">
        <p>Amount</p>
        <p className="font-semibold">{data?.amount}</p>
      </div>
    </div>
  );
}

export default TransferSuccess;
