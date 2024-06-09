import { ColumnDef } from '@tanstack/react-table';
import { TransactionHistory } from '../../lib/types';
import { cn } from '../../lib/utils';

export const columns: ColumnDef<TransactionHistory>[] = [
  {
    accessorKey: 'id',
    header: 'AccoutNo',
  },
  {
    accessorKey: 'adminName',
    header: 'Admin',
    cell: ({ row }) => (row.original.admin ? row.original.admin.name : 'N/A'),
    filterFn: 'includesString',
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => (row.original.user ? row.original.user.name : 'N/A'),
    filterFn: 'includesString',
  },
  {
    accessorKey: 'time',
    header: 'Time',
    // cell: ({ row }) => {
    //   const date = row.original.time;
    //   const formatData = new Date(date).toString();
    //   const [day, month, dayOfMonth, year, time] = formatData.split(' ');
    //   const result = `${day} ${month} ${dayOfMonth} ${year} ${time}`;
    //   return result;
    // },
  },
  {
    accessorKey: 'senderName',
    header: 'Sender',
    cell: ({ row }) => (row.original.sender ? row.original.sender.name : 'N/A'),
  },
  {
    accessorKey: 'receiverName',
    header: 'Receiver',
    cell: ({ row }) =>
      row.original.receiver ? row.original.receiver.name : 'N/A',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      return (
        <p
          className={cn('text-green-600', {
            'text-red-600': row.original.type === 'withdraw',
          })}
        >
          {row.original.type ? row.original.type : 'transfer'}
        </p>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];
