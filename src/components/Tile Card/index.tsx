import { FC } from 'react';

export interface TileCardProps {
  title: string;
  link: string;
  customLink?: {
    component: any;
    hrefProperty: string;
  };
  icon: FC;
  iconClassName?: string;
  disabled?: boolean;
}
