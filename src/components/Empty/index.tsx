import React, {  HTMLAttributes } from 'react';

export interface EmptyProps extends HTMLAttributes<HTMLSpanElement> {
  description: string;
  image: string;
  children: React.ReactNode;
}

export const Empty: React.FC<EmptyProps> = ({
  description,
  image,
  children
}) => {
  return (
    <div className='justify-items-center grid grid-cols-1'>
        <img src={image} alt='EmptyImage'/>
        <div className='font-mono text-sm text-center'>
          {description}
            <div>
            {children}
            </div>
        </div>
    </div>
  );
};
