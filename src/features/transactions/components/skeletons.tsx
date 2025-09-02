'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function TransactionAnalyticsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
        </div>
    )
}

export function TransactionHeaderSkeleton() {
    return (
        <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-24" />
        </div>
    )
}

export function TransactionFiltersSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-48" />
            </div>
        </div>
    )
}

export function TransactionsTableSkeleton() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12"><Skeleton className="h-4 w-4" /></TableHead>
                        <TableHead className="min-w-[100px]"><Skeleton className="h-4 w-20" /></TableHead>
                        <TableHead className="min-w-[80px]"><Skeleton className="h-4 w-16" /></TableHead>
                        <TableHead className="min-w-[120px]"><Skeleton className="h-4 w-24" /></TableHead>
                        <TableHead className="min-w-[200px]"><Skeleton className="h-4 w-48" /></TableHead>
                        <TableHead className="text-right min-w-[100px]"><Skeleton className="h-4 w-20 ml-auto" /></TableHead>
                        <TableHead className="text-right min-w-[100px]"><Skeleton className="h-4 w-10 ml-auto" /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(5)].map((_, i) => (
                        <TableRow key={i}>
                            <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-10 ml-auto" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export function TransactionsPageSkeleton() {
    return (
        <>
            <TransactionAnalyticsSkeleton />
            <Card>
                <CardHeader>
                    <TransactionHeaderSkeleton />
                </CardHeader>
                <CardContent>
                    <TransactionFiltersSkeleton />
                    <TransactionsTableSkeleton />
                </CardContent>
            </Card>
        </>
    )
}
