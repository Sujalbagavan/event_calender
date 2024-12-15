import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentMonth: string;
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthSelect: (month: number) => void;
  onYearSelect: (year: number) => void;
}

export function CalendarHeader({ 
  currentMonth, 
  currentDate,
  onPrevMonth, 
  onNextMonth,
  onMonthSelect,
  onYearSelect
}: CalendarHeaderProps) {
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: format(new Date(2024, i, 1), 'MMMM')
  }));

  const years = Array.from({ length: 10 }, (_, i) => ({
    value: (new Date().getFullYear() - 5 + i).toString(),
    label: (new Date().getFullYear() - 5 + i).toString()
  }));

  return (
    <div className="flex flex-col gap-4 p-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold hidden md:block">{currentMonth}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Select
          value={currentDate.getMonth().toString()}
          onValueChange={(value) => onMonthSelect(parseInt(value))}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={currentDate.getFullYear().toString()}
          onValueChange={(value) => onYearSelect(parseInt(value))}
        >
          <SelectTrigger className="w-full sm:w-[100px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year.value} value={year.value}>
                {year.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}