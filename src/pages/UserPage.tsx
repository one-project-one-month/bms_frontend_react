import ListSkeleton from '@/components/ui/TableSkeleton';
import ActionButton from '@/components/users/ActionButton';
import { DataTable } from '@/components/users/DataTable';
import UpdateUserModal from '@/components/users/UpdateUserModal';
import { useFetchUser } from '@/hooks/useFetchUser';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { UserForm } from '../lib/types';
import { stateCodes, townshipCodes } from '@/lib/postal';

const UserPage = () => {
  const GetUser = useFetchUser<UserForm[]>();
  const [deactivatedUsers, setDeactivatedUsers] = useState<
    (string | null | undefined)[]
  >([]);
  const [userData, setUserData] = useState<UserForm[]>();

  useEffect(() => {
    if (GetUser.isSuccess && GetUser.data) {
      setUserData(GetUser.data);
      setDeactivatedUsers(
        GetUser.data?.map((user) => {
          if (user.isDeactivated) {
            return user.username;
          }
          return;
        }),
      );
    } else if (GetUser.isError) {
      console.log(GetUser.error);
    }
  }, [GetUser.data, GetUser.isError, GetUser.isSuccess, GetUser.isPending]);

  function addDeactivatedUser(username: string) {
    setDeactivatedUsers([...deactivatedUsers, username]);
  }

  function removeDeactivatedUser(username: string) {
    setDeactivatedUsers(deactivatedUsers.filter((user) => user !== username));
  }

  // I moved columns to here because I wanted the reactive effect of chaning the status(activate or deactivate).I can't use useMemo hook because status doesn't change if I use useMemo.
  const columns: ColumnDef<UserForm>[] =
    // useMemo(
    //     () =>
    [
      {
        accessorKey: 'id',
        header: 'Id',
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (row.original.name ? row.original.name : 'N/A'),
        filterFn: 'includesString',
      },
      // {
      //   accessorKey: 'email',
      //   header: 'Email',
      //   cell: ({ row }) => (row.original.email ? row.original.email : 'N/A'),
      //   filterFn: 'includesString',
      // },
      {
        accessorKey: 'username',
        header: 'Username',
        cell: ({ row }) =>
          row.original.username ? row.original.username : 'N/A',
      },
      // these state and township are being too heavy (I know). we have to map throught all postal codes for each cell. it's crazy
      {
        accessorKey: 'state',
        header: 'State',
        cell: ({ row }) =>
          row.original.stateCode
            ? stateCodes.map((state) => {
                if (state.StateCode === row.original.stateCode)
                  return state.StateName;
              })
            : 'N/A',
      },
      {
        accessorKey: 'township',
        header: 'Township',
        cell: ({ row }) =>
          row.original.townshipCode
            ? townshipCodes.map((township) => {
                if (township.TownshipCode === row.original.townshipCode)
                  return township.TownshipCode;
              })
            : 'N/A',
      },
      {
        accessorKey: 'adminName',
        header: 'Admin',
        cell: ({ row }) =>
          row.original.admin ? row.original.admin.name : 'N/A',
      },
      {
        accessorKey: 'balance',
        header: 'Balance',
        cell: ({ row }) =>
          row.original.balance ? row.original.balance : 'N/A',
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const user = row.original;

          return userData ? (
            <UpdateUserModal
              initialData={user}
              userData={userData}
              setUserData={setUserData}
            />
          ) : null;
        },
      },
      {
        id: 'statusChange',
        cell: ({ row }) => {
          return (
            <ActionButton
              username={row.original.username ? row.original.username : ''}
              process={
                deactivatedUsers.length > 0
                  ? deactivatedUsers.includes(row.original.username)
                    ? 'activate'
                    : 'deactivate'
                  : row.original.isDeactivated
                  ? 'activate'
                  : 'deactivate'
              }
              changeStatus={() => {
                row.original.username &&
                  (deactivatedUsers.includes(row.original.username)
                    ? removeDeactivatedUser(row.original.username)
                    : addDeactivatedUser(row.original.username));
              }}
            />
          );
        },
      },
      {
        id: 'delete',
        cell: ({ row }) => {
          return (
            <ActionButton
              username={row.original.username ? row.original.username : ''}
              changeStatus={() =>
                row.original.username &&
                addDeactivatedUser(row.original.username)
              }
              process="delete"
            />
          );
        },
      },
    ];
  //   [],
  // );

  // I need to discuss about how we will show the deleted and deactivated users and how to reduce the load of this file.
  return (
    <div>
      {!GetUser.isPending && userData ? (
        <div className="flex flex-col space-y-3">
          <div className="p-10">
            <DataTable
              columns={columns}
              data={userData}
              error={GetUser.error}
              userData={userData}
              setUserData={setUserData}
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
