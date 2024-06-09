import { useEffect, useState } from 'react';
import { useTransactionHistory } from '../../hooks/useTransactionHistory';
import { TransactionHistory } from '../../lib/types.js';
import { columns } from '../TransactionHistory/column';
import { RecentTable } from '../ui/recent-table.js';
import { Spinner } from '../ui/spinner.js';

const RecentHistory = () => {
  const { data, error, isFetched } =
    useTransactionHistory<TransactionHistory>();
  const [sliceData, setSliceData] = useState<TransactionHistory[]>([]);

  useEffect(() => {
    console.log(data?.data);
    if (data) {
      const sortedData = data?.data.sort(
        (a: { id: number }, b: { id: number }) => {
          return b.id > a.id ? -1 : 1;
        },
      );
      const slicedData = sortedData.slice(0, 5);
      setSliceData(slicedData);
    }
  }, [data]);
  return (
    <div className="overflow-hidden">
      <h2 className="text-xl text-gray-400 mt-4">Recent Transcation History</h2>
      <div className="mt-2"></div>
      {isFetched ? (
        <div>
          <RecentTable columns={columns} data={sliceData} error={error} />
        </div>
      ) : (
        <Spinner className="mx-auto text-slate-400" />
      )}
    </div>
  );
};

export default RecentHistory;
