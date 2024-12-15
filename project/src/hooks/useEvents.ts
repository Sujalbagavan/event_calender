import { useState, useEffect } from 'react';
import { Event, DayEvents } from '@/types/calendar';

const STORAGE_KEY = 'calendar_events';

export const useEvents = () => {
  const [events, setEvents] = useState<DayEvents>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Event) => {
    setEvents(prev => {
      const dateEvents = prev[event.date] || [];
      // Check for time conflicts
      const hasConflict = dateEvents.some(e => 
        (event.startTime >= e.startTime && event.startTime < e.endTime) ||
        (event.endTime > e.startTime && event.endTime <= e.endTime)
      );
      
      if (hasConflict) {
        throw new Error('Time conflict with existing event');
      }

      return {
        ...prev,
        [event.date]: [...dateEvents, event].sort((a, b) => 
          a.startTime.localeCompare(b.startTime)
        ),
      };
    });
  };

  const updateEvent = (event: Event) => {
    setEvents(prev => ({
      ...prev,
      [event.date]: prev[event.date].map(e => 
        e.id === event.id ? event : e
      ),
    }));
  };

  const deleteEvent = (eventId: string, date: string) => {
    setEvents(prev => ({
      ...prev,
      [date]: prev[date].filter(e => e.id !== eventId),
    }));
  };

  const getEventsForDate = (date: string) => events[date] || [];

  const getFilteredEvents = () => {
    if (!searchTerm) return events;
    
    const filtered: DayEvents = {};
    Object.entries(events).forEach(([date, dayEvents]) => {
      const matchingEvents = dayEvents.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingEvents.length > 0) {
        filtered[date] = matchingEvents;
      }
    });
    return filtered;
  };

  return {
    events: getFilteredEvents(),
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    searchTerm,
    setSearchTerm,
  };
};