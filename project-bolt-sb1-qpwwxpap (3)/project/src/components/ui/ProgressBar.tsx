import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  className?: string;
  animate?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showValue = false,
  className = '',
  animate = true,
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  const colorStyles = {
    primary: 'bg-teal-600',
    secondary: 'bg-purple-600',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  };
  
  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`rounded-full ${colorStyles[color]} ${animate ? 'transition-all duration-500 ease-out' : ''}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showValue && (
        <div className="text-xs text-gray-500 mt-1">
          {percentage.toFixed(0)}%
        </div>
      )}
    </div>
  );
};