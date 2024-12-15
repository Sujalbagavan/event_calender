import { cn } from '@/lib/utils';
import type { Event } from '@/types/calendar';

export function useEventColor() {
  const getEventColorClass = (color: Event['color'] = 'default') => {
    switch (color) {
      case 'work':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100';
      case 'personal':
        return 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100';
      case 'other':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100';
    }
  };

  return { getEventColorClass };
}