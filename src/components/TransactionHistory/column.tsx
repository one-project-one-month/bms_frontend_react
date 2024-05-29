import { ColumnDef } from "@tanstack/react-table"
import { TranscationHistory } from "../../lib/types"
import { cn } from "../../lib/utils"

export const columns: ColumnDef<TranscationHistory>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "adminName",
        header: "Admin"
    },
    {
        accessorKey: "userEmail",
        header: "User Email",
    },
    {
        accessorKey: "transactionTime",
        header: "Time",
    },
    {
        accessorKey: "senderName",
        header: "Sender",
        cell: ({ row }) => row.original.type === "transfer" ? row.original.senderName : "N/A"
    },
    {
        accessorKey: "receiverName",
        header: "Receiver",
        cell: ({ row }) => row.original.type === "transfer" ? row.original.receiverName : "N/A"
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            return <p className={cn("text-green-600", { "text-red-500": row.original.type === "withdraw" })}>{row.original.type}</p>
        }
    },
    {
        accessorKey: "amount",
        header: "Amount"
    },
]