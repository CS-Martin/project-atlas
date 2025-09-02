"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CategorySelect } from "./category-select"
import { Doc } from "@/convex/_generated/dataModel"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { transactionFormSchema, TransactionFormValues } from "@/features/transactions/validations/transaction"

interface TransactionFormProps {
    onSubmit: SubmitHandler<TransactionFormValues>
    transaction: Doc<"transactions"> | null
    onClose: () => void
}

export function TransactionForm({ onSubmit, transaction, onClose }: TransactionFormProps) {
    const categories = useQuery(api.categories.api.getAllCategories) || []
    const createCategory = useMutation(api.categories.api.handleCreateCategory)
    const user = useQuery(api.users.api.getCurrentAuthenticatedUser)

    const form = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            type: transaction?.type ?? "income",
            amount: transaction?.amount ?? 0,
            category: transaction?.category ?? "",
            description: transaction?.description ?? "",
            transactionDate: transaction?.transactionDate ?? new Date().toISOString().split("T")[0], // 👈 default today
            fileUrl: transaction?.fileUrl ?? "",
            createdBy: transaction?.createdBy ?? "",
        },
    })

    const handleCategoryChange = async (category: string) => {
        const isExistingCategory = categories.some((c) => c.name === category)
        if (!isExistingCategory && user) {
            await createCategory({ name: category, createdBy: user._id })
        }
        form.setValue("category", category, { shouldValidate: true })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-2">
                {/* Type */}
                <div className="w-1/2">
                    <Label className="block mb-1">Type</Label>
                    <Select
                        onValueChange={(value) => form.setValue("type", value as "income" | "expense", { shouldValidate: true })}
                        defaultValue={form.getValues("type")}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                    </Select>
                    {form.formState.errors.type && (
                        <p className="text-red-600 text-sm mt-1">{form.formState.errors.type.message}</p>
                    )}
                </div>

                {/* Transaction Date */}
                <div className="w-1/2">
                    <Label className="block mb-1">Transaction Date</Label>
                    <Input {...form.register("transactionDate")} type="date" />
                    {form.formState.errors.transactionDate && (
                        <p className="text-red-600 text-sm mt-1">{form.formState.errors.transactionDate.message}</p>
                    )}
                </div>
            </div>

            {/* Amount */}
            <div>
                <Label className="block mb-1">Amount</Label>
                <div className="relative">
                    <span className="absolute inset-y-0 font-medium left-0 px-4 flex items-center border-r border-gray-300">$</span>
                    <Input
                        {...form.register("amount", { valueAsNumber: true })}
                        placeholder="0.00"
                        type="number"
                        step="any"
                        className="pl-13"
                        min={0}
                        max={1_000_000_000}
                    />
                </div>
                {form.formState.errors.amount && (
                    <p className="text-red-600 text-sm mt-1">
                        {form.formState.errors.amount.message}
                    </p>
                )}
            </div>


            {/* Category */}
            <div>
                <Label className="block mb-1">Category</Label>
                <CategorySelect
                    value={form.watch("category")}
                    onChange={handleCategoryChange}
                    categories={categories}
                    creatable
                />
                {form.formState.errors.category && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.category.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <Label className="block mb-1">Description</Label>
                <Textarea
                    rows={2}
                    {...form.register("description")}
                    placeholder="Description"
                />
                {form.formState.errors.description && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.description.message}</p>
                )}
            </div>

            {/* TODO: Add file upload */}

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit">{transaction ? "Save Changes" : "Create Transaction"}</Button>
            </DialogFooter>
        </form>
    )
}
