import { format, isToday, isSameMonth, isWeekend } from 'date-fns';
import { cn } from '@/lib/utils';
import { Event } from '@/types/calendar';
import { Badge } from '@/components/ui/badge';
import { useEventColor } from '@/hooks/useEventColor';

interface CalendarDayProps {
  day: Date;
  currentDate: Date;
  events: Event[];
  isSelected: boolean;
  onSelect: (date: string) => void;
}

export function CalendarDay({ day, currentDate, events, isSelected, onSelect }: CalendarDayProps) {
  const { getEventColorClass } = useEventColor();
  const dateStr = format(day, 'yyyy-MM-dd');
  const isCurrentMonth = isSameMonth(day, currentDate);

  return (
    <div
      onClick={() => onSelect(dateStr)}
      className={cn(
        'min-h-[80px] p-1 sm:p-2 border cursor-pointer transition-colors',
        'hover:bg-accent/50 group',
        isToday(day) && 'bg-primary/5 border-primary/50',
        !isCurrentMonth && 'opacity-50',
        isWeekend(day) && !isSelected && 'bg-muted/50',
        isSelected && 'ring-2 ring-primary bg-accent',
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={cn(
          'text-xs sm:text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full',
          isToday(day) && 'bg-primary text-primary-foreground',
          !isCurrentMonth && 'text-muted-foreground'
        )}>
          {format(day, 'd')}
        </span>
        {events.length > 0 && (
          <Badge variant="secondary" className="text-xs scale-75 sm:scale-100">
            {events.length}
          </Badge>
        )}
      </div>
      
      <div className="space-y-1 hidden sm:block">
        {events.slice(0, 2).map(event => (
          <div
            key={event.id}
            className={cn(
              'text-xs truncate rounded px-1 py-0.5',
              getEventColorClass(event.color)
            )}
          >
            {event.title}
          </div>
        ))}
        {events.length > 2 && (
          <div className="text-xs text-muted-foreground text-center">
            +{events.length - 2} more
          </div>
        )}
      </div>
      
      <div className="sm:hidden">
        {events.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {events.length} event{events.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}