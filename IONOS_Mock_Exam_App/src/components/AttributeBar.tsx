import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AttributeBarProps {
  name: string; // e.g., 'STR', 'INT'
  label: string; // e.g., 'Quant', 'unit2'
  value: number; // 0-100
  displayValue?: string; // Custom display (e.g., '7d' for streak)
  color: 'red' | 'blue' | 'purple' | 'yellow' | 'orange' | 'green';
  className?: string;
}

const colorMap = {
  red: { text: 'text-red-400', bar: 'bg-red-500', glow: 'shadow-red-500/30' },
  blue: { text: 'text-blue-400', bar: 'bg-blue-500', glow: 'shadow-blue-500/30' },
  purple: { text: 'text-purple-400', bar: 'bg-purple-500', glow: 'shadow-purple-500/30' },
  yellow: { text: 'text-yellow-400', bar: 'bg-yellow-500', glow: 'shadow-yellow-500/30' },
  orange: { text: 'text-orange-400', bar: 'bg-orange-500', glow: 'shadow-orange-500/30' },
  green: { text: 'text-primary', bar: 'bg-primary', glow: 'shadow-primary/30' },
};

export function AttributeBar({
  name,
  label,
  value,
  displayValue,
  color,
  className,
}: AttributeBarProps) {
  const colors = colorMap[color];

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Attribute Name */}
      <div className="w-10">
        <span className={cn('font-mono font-bold text-sm', colors.text)}>{name}</span>
      </div>

      {/* Label */}
      <div className="w-16 text-xs text-muted-foreground">{label}</div>

      {/* Progress Bar - Segmented FF7R Style */}
      <div className="flex-1 h-2 bg-muted/30 rounded-sm overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-sm',
            colors.bar,
            value > 70 && 'shadow-lg',
            value > 70 && colors.glow
          )}
          style={{
            background: `repeating-linear-gradient(
              90deg,
              currentColor 0px,
              currentColor 6px,
              transparent 6px,
              transparent 8px
            )`,
          }}
        />
      </div>

      {/* Value */}
      <div className="w-12 text-right">
        <span className="font-mono text-sm font-semibold text-foreground">
          {displayValue || `${value}%`}
        </span>
      </div>
    </div>
  );
}

