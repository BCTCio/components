import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useDebouncedValue, useHover } from '@mantine/hooks';

export interface ToolTipProps {
  children: ReactNode;
  tooltip: string;
  delay?: number;
  disabled?: boolean;
}

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  tooltip,
  delay = 700,
  disabled,
}) => {
  const { ref, hovered } = useHover();
  const [debouncedHover] = useDebouncedValue(hovered, delay);
  return (
    <div className="relative">
      <div ref={ref}>{children}</div>
      <div
        className={classNames(
          'absolute -bottom-1 translate-y-full transition-opacity bg-gray-700 text-white text-sm rounded px-2 py-1',
          hovered && debouncedHover && !disabled
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {tooltip}
      </div>
    </div>
  );
};
