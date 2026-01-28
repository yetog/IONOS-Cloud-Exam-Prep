import { cn } from '@/lib/utils';

interface MateriaIndicatorProps {
  filled: number; // Number of filled slots (0-5)
  total?: number; // Total slots (default 5)
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MateriaIndicator({ 
  filled, 
  total = 5, 
  size = 'md',
  className 
}: MateriaIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'rotate-45 border transition-all duration-300',
            sizeClasses[size],
            i < filled
              ? 'bg-primary border-primary shadow-[0_0_8px_hsl(var(--primary))]'
              : 'bg-transparent border-primary/40'
          )}
        />
      ))}
    </div>
  );
}
