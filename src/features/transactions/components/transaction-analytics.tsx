"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, BanknoteArrowUp, FolderKanban } from "lucide-react"
import { NumberTicker } from "@/components/magicui/number-ticker"

interface TransactionAnalyticsProps {
    transactions: Doc<"transactions">[]
}

export function TransactionAnalytics({ transactions }: TransactionAnalyticsProps) {
    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0)

    const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0)

    const netFlow = totalIncome - totalExpenses

    const cards = [
        {
            title: "Total Income",
            value: totalIncome,
            sign: "+",
            color: "text-green-500",
            icon: <TrendingUp className="h-6 w-6 text-green-500" />,
        },
        {
            title: "Total Expenses",
            value: totalExpenses,
            sign: "-",
            color: "text-red-500",
            icon: <TrendingDown className="h-6 w-6 text-red-500" />,
        },
        {
            title: "Net Flow",
            value: Math.abs(netFlow),
            sign: netFlow >= 0 ? "+" : "-",
            color: netFlow >= 0 ? "text-green-500" : "text-red-500",
            icon: <BanknoteArrowUp className={`h-6 w-6 ${netFlow >= 0 ? "text-green-500" : "text-red-500"}`} />,
        },
        {
            title: "Total Transactions",
            value: transactions.length,
            sign: "",
            color: "text-black",
            icon: <FolderKanban className="h-6 w-6 text-blue-500" />,
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {cards.map((card, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            {card.icon}
                        </CardHeader>
                        <CardContent>
                            <NumberTicker
                                value={card.value}
                                className={`text-2xl font-bold ${card.color}`}
                                prefix={card.title !== "Total Transactions" ? card.sign + "$" : ""}
                            />

                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
