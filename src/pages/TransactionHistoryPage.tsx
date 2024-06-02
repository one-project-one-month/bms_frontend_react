import { useEffect, useState } from 'react';
import { columns } from '../components/TransactionHistory/column';
import { DataTable } from '../components/ui/DataTable';
import ListSkeleton from '../components/ui/TableSkeleton';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { TransactionHistory, TransactionHistoryResponse } from '../lib/types';

const TransactionHistoryPage = () => {
  const [transactionData, setTransactionData] = useState<TransactionHistory[]>(
    [],
  );
  const GetTransactionQuery =
    useTransactionHistory<TransactionHistoryResponse>();

  useEffect(() => {
    if (GetTransactionQuery.isSuccess && GetTransactionQuery.data) {
      console.log(GetTransactionQuery.data);

      // response.data is an array of TransactionHistory
      setTransactionData(GetTransactionQuery.data.data);
    } else if (GetTransactionQuery.isError) {
      console.log(GetTransactionQuery.error);
    }
  }, [
    GetTransactionQuery.isError,
    GetTransactionQuery.isSuccess,
    GetTransactionQuery.isPending,
  ]);

  return (
    <div>
      {transactionData ? (
        <div className="p-10">
          <DataTable
            columns={columns}
            data={transactionData}
            error={GetTransactionQuery.error}
          />
        </div>
      ) : (
        <ListSkeleton className="p-10 w-full" />
      )}
    </div>
  );
};

export default TransactionHistoryPage;
