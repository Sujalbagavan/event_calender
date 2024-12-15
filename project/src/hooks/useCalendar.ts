import { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, setMonth, setYear } from 'date-fns';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  };

  const nextMonth = () => setCurrentDate(prev => {
    const next = new Date(prev);
    next.setMonth(prev.getMonth() + 1);
    return next;
  });

  const prevMonth = () => setCurrentDate(prev => {
    const next = new Date(prev);
    next.setMonth(prev.getMonth() - 1);
    return next;
  });

  const setSpecificMonth = (month: number) => {
    setCurrentDate(prev => setMonth(prev, month));
  };

  const setSpecificYear = (year: number) => {
    setCurrentDate(prev => setYear(prev, year));
  };
  
  const days = getDaysInMonth(currentDate);
  const currentMonthStr = format(currentDate, 'MMMM yyyy');

  return {
    days,
    currentDate,
    currentMonthStr,
    nextMonth,
    prevMonth,
    setSpecificMonth,
    setSpecificYear,
  };
};