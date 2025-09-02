I am building a financial dashboard in Next.js with shadcn/ui and TailwindCSS. I want you to generate production-ready React code that follows these requirements:

Analytics Cards (Top Section)

Four cards in a responsive grid:

Total Income

Total Expenses

Net Balance

Top Expense Category (category with the highest total expense).

Each card should use Card from shadcn/ui and include a title, icon, and animated number counter.

Use lucide-react icons for visuals.

Animate entry with framer-motion.

Bar Chart Section

Below the cards, create a bar chart comparing Income vs Expenses over time.

Use Recharts (already compatible with shadcn/ui).

Data should be dynamically filtered by date range.

Date Filter Dropdown

Add a dropdown (shadcn Select component) for filtering the data:

Options:

This Month

Last Month

Custom Range (if selected, show 2 date pickers side by side using shadcn/ui date picker).

Use zustand as a global state manager to store the selected date range and propagate it to both cards and charts.

Design

Clean, minimal dashboard look with a grid layout.

Cards should have shadows, rounded corners, and hover effects.

Chart section should be inside a Card as well for consistency.

Please include:

A zustand store implementation for date filtering.

A fully working example of the cards, bar chart, and filter integration.

Proper TypeScript typings.

<!-- Example of Bar chart code from shadcn -->

"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import {
ChartConfig,
ChartContainer,
ChartTooltip,
ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartData = [
{ month: "January", desktop: 186 },
{ month: "February", desktop: 305 },
{ month: "March", desktop: 237 },
{ month: "April", desktop: 73 },
{ month: "May", desktop: 209 },
{ month: "June", desktop: 214 },
]

const chartConfig = {
desktop: {
label: "Desktop",
color: "var(--chart-1)",
},
} satisfies ChartConfig

export function ChartBarDefault() {
return (
<Card>
<CardHeader>
<CardTitle>Bar Chart</CardTitle>
<CardDescription>January - June 2024</CardDescription>
</CardHeader>
<CardContent>
<ChartContainer config={chartConfig}>
<BarChart accessibilityLayer data={chartData}>
<CartesianGrid vertical={false} />
<XAxis
dataKey="month"
tickLine={false}
tickMargin={10}
axisLine={false}
tickFormatter={(value) => value.slice(0, 3)}
/>
<ChartTooltip
cursor={false}
content={<ChartTooltipContent hideLabel />}
/>
<Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
</BarChart>
</ChartContainer>
</CardContent>
<CardFooter className="flex-col items-start gap-2 text-sm">

<div className="flex gap-2 leading-none font-medium">
Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
</div>
<div className="text-muted-foreground leading-none">
Showing total visitors for the last 6 months
</div>
</CardFooter>
</Card>
)
}
