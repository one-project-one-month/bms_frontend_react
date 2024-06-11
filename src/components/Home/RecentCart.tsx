import { UserData } from "@/lib/types";

const RecentCart = ({ data }: { data: UserData }) => {
  return (
    <div className=" border py-2 cursor-pointer hover:scale-110 bg-green-200/60 m-1 rounded-lg shawdow-lg shadow-black">
      <div className="flex justify-between items-center px-4  ">
        <h1>{data.name}</h1>
        <h2>{data.balance}</h2>
      </div>
    </div>
  );
};

export default RecentCart;
