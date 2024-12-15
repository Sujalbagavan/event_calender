import { format, startOfWeek, addDays } from 'date-fns';
import { Event } from '@/types/calendar';
import { CalendarDay } from './CalendarDay';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  events: { [key: string]: Event[] };
  onSelectDate: (date: string) => void;
  selectedDate: string | null;
}

export function CalendarGrid({ days, currentDate, events, onSelectDate, selectedDate }: CalendarGridProps) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startDate = startOfWeek(days[0]);
  const calendarDays = Array.from({ length: 42 }, (_, i) => addDays(startDate, i));

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="grid grid-cols-7 gap-px bg-muted p-2">
          {weekDays.map(day => (
            <div
              key={day}
              className={cn(
                "text-sm font-medium text-center p-2",
                "text-muted-foreground"
              )}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day[0]}</span>
            </div>
          ))}
          
          {calendarDays.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            return (
              <CalendarDay
                key={dateStr}
                day={day}
                currentDate={currentDate}
                events={events[dateStr] || []}
                isSelected={dateStr === selectedDate}
                onSelect={onSelectDate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}