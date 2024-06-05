export default function Card() {
    return <div>
      <div className="border w-[350px] h-[200px] p-8 mx-auto mt-4 rounded-lg bg-[#131418] shadow-lg shadow-slate-400 text-white cursor-pointer hover:scale-110">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl space-x-1">VISA</h1>
          <div className="w-[40px] h-[40px] bg-white">
          </div>
        </div>
        <div>
          <h2 className=" p-2 mt-2">456 8456 9874 2468</h2>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
          <h1 className="text-gray-500">Card holder</h1>
          <h4 className="text-md">Admin</h4>
          </div>
          <div>
            <h1 className="text-gray-500">Exp Date</h1>
            <h4 className="text-md">05/2030</h4>
          </div>
        </div>
      </div>
    </div>;
  }
  