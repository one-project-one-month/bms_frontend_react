import { useFetchUser } from '@/hooks/useFetchUser';
import { UserData } from '@/lib/types';
import RecentCart from './RecentCart.js';
import { useState, useEffect } from 'react';
import { LoaderIcon } from 'lucide-react';

export default function RecentUser() {
  const { data, error, isFetched } = useFetchUser<UserData>();
  const [sliceData, setSliceData] = useState<UserData[]>([]);

  useEffect(() => {
    if (data) {
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => {
        return b.id > a.id ? -1 : 1;
      });
      const slicedData = sortedData.slice(0, 4);
      setSliceData(slicedData);
    }
  }, [data]);
  return (
    <div className="border-2 p-1 rounded-lg shadow-lg">
      <h2 className="text-xl px-4 py-2 text-gray-500">New User</h2>
      {isFetched ? (
        <div className="w-[100%] h-[150px]">
          {sliceData &&
            sliceData.map((user) => {
              return <RecentCart key={user.id} data={user} />;
            })}
          {error && <div>{error.message}</div>}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <LoaderIcon size={32} />
        </div>
      )}
    </div>
  );
}
