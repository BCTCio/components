import { hookstate } from '@hookstate/core';
import { ConfirmationBoxData } from '../ConfirmationBox';

export const globalConfirmation = hookstate<
  ConfirmationBoxData & { show: boolean }
>({
  title: '',
  description: '',
  show: false,
  onConfirm() {},
});

export const confirmation = (data: ConfirmationBoxData) =>
  globalConfirmation.set({ type: 'warning', ...data, show: true });
