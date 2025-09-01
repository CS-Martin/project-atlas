"use client"

import { useState } from "react"
import { ChevronsUpDown, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"

interface CategorySelectProps {
    value: string
    onChange: (val: string) => void
    categories: Doc<'categories'>[]
    creatable?: boolean
    onDelete?: (val: string) => void
}

export function CategorySelect({
    value,
    onChange,
    categories,
    creatable = true,
}: CategorySelectProps) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const deleteCategory = useMutation(api.categories.api.handleDeleteCategory)

    const handleDeleteCategory = (category: Id<'categories'>) => {
        deleteCategory({ id: category })
    }

    const trimmedQuery = query.trim().toLowerCase()

    const filteredOptions = categories.filter((category) =>
        category.name.toLowerCase().includes(trimmedQuery)
    )

    const allowCreate =
        creatable &&
        trimmedQuery.length > 0 &&
        !categories.some((category) => category.name.toLowerCase() === trimmedQuery)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between font-normal"
                >
                    {value || "Select or create category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search or create category..."
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {allowCreate && (
                                <CommandItem
                                    value={query}
                                    onSelect={() => {
                                        onChange(query)
                                        setQuery("")
                                        setOpen(false)
                                    }}
                                >
                                    + Create “{query}”
                                </CommandItem>
                            )}
                            {filteredOptions.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.name}
                                    onSelect={() => {
                                        onChange(category.name)
                                        setQuery("")
                                        setOpen(false)
                                    }}
                                    className="group flex justify-between items-center"
                                >
                                    <div className="flex items-center">
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === category.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {category.name}
                                    </div>
                                    <Trash2
                                        className="h-4 w-4 text-red-400 hover:text-red-600 hover:scale-110 transition-all cursor-pointer group-hover:block hidden"
                                        onClick={(e) => {
                                            e.stopPropagation() // prevent selecting the item
                                            handleDeleteCategory(category._id)
                                        }}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
