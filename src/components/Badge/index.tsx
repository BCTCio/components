import React, { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg" | "xl";
  color: string;
  text: string;
  rounded?: boolean;
}
const sizeToClass = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-3.5 py-1.5 text-base',
  xl: 'px-4 py-2 text-lg',
};

export const Badge: React.FC<BadgeProps> = ({
  color,
  text,
  size = 'md',
  rounded,
}) => {
  const round = rounded ? 'rounded-full' : '';
  return (
    <div
      className={`inline-flex items-center font-medium text-${color}-800 bg-${color}-100 ${sizeToClass[size]} ${round}`}
    >
      {text}
    </div>
  );
};