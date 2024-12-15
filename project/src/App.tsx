import { useState } from 'react';
import { Plus, Search, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCalendar } from '@/hooks/useCalendar';
import { useEvents } from '@/hooks/useEvents';
import { CalendarHeader } from '@/components/Calendar/CalendarHeader';
import { CalendarGrid } from '@/components/Calendar/CalendarGrid';
import { EventDialog } from '@/components/Calendar/EventDialog';
import { EventList } from '@/components/Calendar/EventList';
import { MobileEventButton } from '@/components/Calendar/MobileEventButton';
import { Event } from '@/types/calendar';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const { 
    days, 
    currentDate, 
    currentMonthStr, 
    nextMonth, 
    prevMonth,
    setSpecificMonth,
    setSpecificYear 
  } = useCalendar();
  
  const { events, addEvent, updateEvent, deleteEvent, searchTerm, setSearchTerm } = useEvents();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  
  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setIsEventListOpen(true);
  };

  const handleAddEvent = () => {
    if (!selectedDate) return;
    setSelectedEvent(undefined);
    setIsEventDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleSaveEvent = (event: Event) => {
    try {
      if (selectedEvent) {
        updateEvent(event);
        toast({
          title: 'Event updated',
          description: 'Your event has been successfully updated.',
        });
      } else {
        addEvent(event);
        toast({
          title: 'Event added',
          description: 'Your event has been successfully added.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (!selectedDate) return;
    deleteEvent(eventId, selectedDate);
    toast({
      title: 'Event deleted',
      description: 'Your event has been successfully deleted.',
    });
  };

  const hasSelectedDateEvents = selectedDate && events[selectedDate]?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-2 sm:p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 sm:h-8 sm:w-8" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Event Calendar</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            {selectedDate && (
              <Button onClick={handleAddEvent} className="sm:w-auto">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add Event</span>
              </Button>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <CalendarHeader
            currentMonth={currentMonthStr}
            currentDate={currentDate}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onMonthSelect={setSpecificMonth}
            onYearSelect={setSpecificYear}
          />
          <CalendarGrid
            days={days}
            currentDate={currentDate}
            events={events}
            onSelectDate={handleSelectDate}
            selectedDate={selectedDate}
          />
        </div>

        {selectedDate && (
          <>
            <EventDialog
              isOpen={isEventDialogOpen}
              onClose={() => setIsEventDialogOpen(false)}
              onSave={handleSaveEvent}
              selectedDate={selectedDate}
              event={selectedEvent}
            />
            <EventList
              isOpen={isEventListOpen}
              onClose={() => setIsEventListOpen(false)}
              events={events[selectedDate] || []}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              selectedDate={selectedDate}
            />
          </>
        )}

        <MobileEventButton
          onClick={() => setIsEventListOpen(true)}
          hasEvents={hasSelectedDateEvents}
        />
      </div>
      <Toaster />
    </div>
  );
}

export default App;