import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileEventButtonProps {
  onClick: () => void;
  hasEvents: boolean;
}

export function MobileEventButton({ onClick, hasEvents }: MobileEventButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'fixed bottom-4 right-4 h-14 w-14 rounded-full md:hidden shadow-lg',
        hasEvents && 'bg-primary text-primary-foreground hover:bg-primary/90'
      )}
      onClick={onClick}
    >
      <Calendar className="h-6 w-6" />
      {hasEvents && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive" />
      )}
    </Button>
  );
}