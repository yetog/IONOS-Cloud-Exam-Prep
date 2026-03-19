import { cn } from '@/lib/utils';
import { MateriaIndicator } from './MateriaIndicator';
import { LucideIcon, Swords, BookOpen, Target } from 'lucide-react';

interface EquipmentSlotProps {
  icon?: LucideIcon;
  name: string;
  description: string;
  materiaFilled: number; // 0-5 for skill mastery level
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function EquipmentSlot({
  icon: Icon = Swords,
  name,
  description,
  materiaFilled,
  isActive = false,
  onClick,
  className,
}: EquipmentSlotProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative p-3 rounded-lg border transition-all duration-300',
        'bg-card/50 backdrop-blur-sm',
        isActive
          ? 'border-primary/60 shadow-[inset_0_0_20px_hsl(var(--primary)/0.1)]'
          : 'border-border/50 hover:border-primary/40',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Content */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            'p-2 rounded-lg transition-colors',
            isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-foreground text-sm truncate">{name}</h4>
            <MateriaIndicator filled={materiaFilled} size="sm" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
        </div>
      </div>

      {/* Active Glow Effect */}
      {isActive && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      )}
    </div>
  );
}

