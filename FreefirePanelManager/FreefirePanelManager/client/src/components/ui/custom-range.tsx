import React from 'react';
import { cn } from '@/lib/utils';

interface CustomRangeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: number) => void;
}

const CustomRange = React.forwardRef<HTMLInputElement, CustomRangeProps>(
  ({ className, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onValueChange) onValueChange(Number(e.target.value));
    };

    return (
      <input
        type="range"
        className={cn(
          "custom-range w-full appearance-none h-2 rounded bg-gradient-to-r from-blue-800 via-game-blue to-blue-400",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
        style={{
          // Add browser-specific styles for range thumb
          WebkitAppearance: 'none',
          appearance: 'none',
          ...((props as any).style || {}),
        }}
      />
    );
  }
);

CustomRange.displayName = 'CustomRange';

// Add style rules for range thumb in the custom CSS
export { CustomRange };
