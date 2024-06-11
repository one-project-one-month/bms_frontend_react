import { ColumnDef, Row } from '@tanstack/react-table';
import { TransactionHistory } from '../../lib/types';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router';

const DetailComponent = (row: Row<TransactionHistory>) => {
  const navigate = useNavigate()

  return (
    <p
      className="underline cursor-pointer"
      onClick={() => navigate(`/transactionHistory/detail`,
        {
          state: {
            data: row.original
          }
        })}>detail</p>
  )
}

export const columns: ColumnDef<TransactionHistory>[] = [
  {
    accessorKey: 'id',
    header: 'TransactionId',
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
    cell: ({ row }) => {
      const date = row.original.time;
      const formatData = new Date(date).toString();
      const [_, dayOfMonth, year, time] = formatData.split(' ');
      const result = ` ${dayOfMonth} ${year} ${time}`;
      return result;
    },
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
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.amount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      </div>
    )
  },
  {
    accessorKey: "detail",
    header: "Detail",
    cell: ({ row }) => DetailComponent(row)
  }


];
