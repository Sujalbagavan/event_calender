import { format } from 'date-fns';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Event } from '@/types/calendar';
import { Pencil, Trash2 } from 'lucide-react';

interface EventListProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
  selectedDate: string;
}

export function EventList({
  isOpen,
  onClose,
  events,
  onEditEvent,
  onDeleteEvent,
  selectedDate,
}: EventListProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Events for {format(new Date(selectedDate), 'PP')}
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="space-y-4">
            {events.map(event => (
              <div
                key={event.id}
                className="p-4 border rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditEvent(event)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {event.startTime} - {event.endTime}
                </div>
                
                {event.description && (
                  <p className="text-sm">{event.description}</p>
                )}
                
                {event.color && event.color !== 'default' && (
                  <div className="text-xs text-muted-foreground capitalize">
                    Category: {event.color}
                  </div>
                )}
              </div>
            ))}
            
            {events.length === 0 && (
              <div className="text-center text-muted-foreground">
                No events scheduled for this day
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}