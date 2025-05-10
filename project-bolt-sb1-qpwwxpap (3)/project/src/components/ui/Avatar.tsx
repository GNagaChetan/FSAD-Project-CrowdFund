import React from 'react';
import { getInitialsAvatar } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };
  
  const avatarSrc = src || getInitialsAvatar(name);
  
  return (
    <div 
      className={`relative rounded-full overflow-hidden flex items-center justify-center bg-gray-200 ${sizeStyles[size]} ${className}`}
    >
      <img 
        src={avatarSrc} 
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = getInitialsAvatar(name);
        }}
      />
    </div>
  );
};