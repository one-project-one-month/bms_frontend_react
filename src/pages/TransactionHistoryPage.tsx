import { columns } from "../components/TransactionHistory/column"
import { DataTable } from "../components/ui/data-table"
import { useTransactionHistory } from "../hooks/useTransactionHistory"
import { TranscationHistory } from "../lib/types"



const TransactionHistoryPage = () => {
    const { data } = useTransactionHistory<TranscationHistory>()
    return (
        <DataTable columns={columns} data={data ? data : []} />

    )
}

export default TransactionHistoryPage