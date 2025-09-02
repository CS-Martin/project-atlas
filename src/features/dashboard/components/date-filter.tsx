'use client';

import { useState } from 'react';
import { useDashboardFilter } from '@/hooks/use-dashboard-filter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { subDays, format, subMonths } from 'date-fns';

export function DateFilter() {
  const { dateRange, setDateRange } = useDashboardFilter();
  const [range, setRange] = useState<DateRange | undefined>({
    from: dateRange.from,
    to: dateRange.to,
  });

  const handleSelectChange = (value: string) => {
    const now = new Date();
    let from: Date;
    const to: Date = now;

    switch (value) {
      case 'today':
        from = now;
        break;
      case 'last-7-days':
        from = subDays(now, 6);
        break;
      case 'last-month':
        from = subMonths(now, 1);
        break;
      case 'last-3-months':
        from = subMonths(now, 3);
        break;
      case 'last-6-months':
        from = subMonths(now, 6);
        break;
      case 'this-year':
        from = new Date(now.getFullYear(), 0, 1);
        break;
      case 'custom':
        // For custom, we don't set the date range until the user applies it
        return;
      default:
        from = subDays(now, 30); // Default to last 30 days
    }

    setDateRange({ from, to });
    setRange({ from, to });
  };

  const handleCustomDateApply = () => {
    if (range) {
      setDateRange({ from: range.from, to: range.to });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="last-7-days">Last 7 days</SelectItem>
          <SelectItem value="last-month">Last month</SelectItem>
          <SelectItem value="last-3-months">Last 3 months</SelectItem>
          <SelectItem value="last-6-months">Last 6 months</SelectItem>
          <SelectItem value="this-year">This year</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className="w-[300px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from ? (
              range.to ? (
                <>
                  {format(range.from, 'LLL dd, y')} -{' '}
                  {format(range.to, 'LLL dd, y')}
                </>
              ) : (
                format(range.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
          />
          <div className="p-2">
            <Button onClick={handleCustomDateApply}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
