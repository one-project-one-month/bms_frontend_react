import { columns } from "../components/TransactionHistory/column"
import { DataTable } from "../components/ui/data-table"
import ListSkeleton from "../components/ui/table-skeleton"
import { useTransactionHistory } from "../hooks/useTransactionHistory"
import { TranscationHistoryResponse } from "../lib/types"



const TransactionHistoryPage = () => {
    const { data, isFetched, error } = useTransactionHistory<TranscationHistoryResponse>()
    return (
        <>
            {
                isFetched ? (
                    <div className="p-10" >
                        <DataTable
                            columns={columns}
                            data={data?.data ? data?.data : []}
                            error={error}

                        />
                    </div >
                ) : <ListSkeleton className="p-10 w-full" />}
        </>


    )
}

export default TransactionHistoryPage