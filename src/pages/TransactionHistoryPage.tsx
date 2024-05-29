import { columns } from "../components/TransactionHistory/column"
import { DataTable } from "../components/ui/data-table"
import { useTransactionHistory } from "../hooks/useTransactionHistory"
import { TranscationHistoryResponse } from "../lib/types"



const TransactionHistoryPage = () => {
    const { data } = useTransactionHistory<TranscationHistoryResponse>()
    return (
        <div className="p-10 w-full">
            <DataTable columns={columns} data={data?.data ? data?.data : []} />
        </div>
    )
}

export default TransactionHistoryPage