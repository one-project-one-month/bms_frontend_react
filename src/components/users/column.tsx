import { ColumnDef } from '@tanstack/react-table';
import { stateCodes, townshipCodes } from '@/lib/postal';
import ActionButton from './ActionButton';
import UpdateUserModal from './UpdateUserModal';
import { UserData } from '../../lib/types';

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => (row.original.username ? row.original.username : 'N/A'),
    filterFn: 'includesString',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (row.original.name ? row.original.name : 'N/A'),
    filterFn: 'includesString',
  },
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
              return township.TownshipName;
          })
        : 'N/A',
  },
  {
    accessorKey: 'adminName',
    header: 'Admin',
    cell: ({ row }) => (row.original.admin ? row.original.admin.name : 'N/A'),
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.balance
          ? row.original.balance
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '0'}
      </div>
    ),

  },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return <UpdateUserModal initialData={user} />;
    },
  },
  {
    id: 'statusChange',
    cell: ({ row }) => {
      return (
        <ActionButton
          username={row.original.username ? row.original.username : ''}
          process={row.original.isDeactivated ? 'activate' : 'deactivate'}
        />
      );
    },
  },
  {
    id: 'delete',
    cell: ({ row }) => {
      return row.original.isDeleted ? (
        <p className="ps-[10px] font-semibold text-[#ed2929]">Deleted</p>
      ) : (
        <ActionButton
          username={row.original.username ? row.original.username : ''}
          process="delete"
        />
      );
    },
  },
];
