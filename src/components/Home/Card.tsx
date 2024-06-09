export default function Card() {
  return (
    <div>
      <div className="border mx-4 h-[240px] p-8  rounded-lg bg-green-200/60 shadow-lg shadow-slate-400  cursor-pointer hover:scale-110">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl space-x-1">VISA</h1>
          <div className="w-[40px] h-[40px] bg-black"></div>
        </div>
        <div>
          <h2 className=" p-2 mt-2">456 8456 9874 2468</h2>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <h1 className="text-gray-400">Card holder</h1>
            <h4 className="text-md">Admin</h4>
          </div>
          <div>
            <h1 className="text-gray-400">Exp Date</h1>
            <h4 className="text-md">05/2030</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
