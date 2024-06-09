import ListSkeleton from '@/components/ui/TableSkeleton';
import { DataTable } from '@/components/users/DataTable';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useEffect, useState } from 'react';
import { UserData } from '../lib/types';
import { columns } from '@/components/users/column';

const UserPage = () => {
  const { data, isError, error, isPending, isSuccess } =
    useFetchUser<UserData>();
  const [userData, setUserData] = useState<UserData[]>();

  useEffect(() => {
    if (isSuccess && data) {
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => {
        return b.id > a.id ? -1 : 1;
      });
      setUserData(sortedData);
    } else if (isError) {
      console.log(error);
    }
  }, [data, isError, isSuccess, isPending]);

  return (
    <div>
      {!isPending && userData ? (
        <div className="flex flex-col space-y-3">
          <div className="p-10">
            <DataTable columns={columns} data={userData} error={error} />
          </div>
        </div>
      ) : (
        <ListSkeleton className="p-10 w-full" />
      )}
    </div>
  );
};

export default UserPage;
