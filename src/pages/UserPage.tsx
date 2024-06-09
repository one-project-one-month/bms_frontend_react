import ListSkeleton from '@/components/ui/TableSkeleton';
import { DataTable } from '@/components/users/DataTable';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useEffect, useState } from 'react';
import { UserForm } from '../lib/types';
import { columns } from '@/components/users/column';

const UserPage = () => {
  const GetUser = useFetchUser<UserForm[]>();
  const [userData, setUserData] = useState<UserForm[]>();

  useEffect(() => {
    if (GetUser.isSuccess && GetUser.data) {
      setUserData(GetUser.data);
    } else if (GetUser.isError) {
      console.log(GetUser.error);
    }
  }, [GetUser.data, GetUser.isError, GetUser.isSuccess, GetUser.isPending]);

  return (
    <div>
      {!GetUser.isPending && userData ? (
        <div className="flex flex-col space-y-3">
          <div className="p-10">
            <DataTable
              columns={columns}
              data={userData}
              error={GetUser.error}
            />
          </div>
        </div>
      ) : (
        <ListSkeleton className="p-10 w-full" />
      )}
    </div>
  );
};

export default UserPage;
