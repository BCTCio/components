import { createState } from '@hookstate/core';

export const globalNotifications = createState<{
  show: boolean;
  title: string;
  description?: string;
  duration?: number;
  type: 'error' | 'success' | 'warning' | 'loading';
}>({
  show: false,
  title: '',
  type: 'success',
});

export const error = (
  err: any,
  {
    title = 'Something went wrong',
    fallback,
    duration,
  }: {
    title?: string;
    fallback?: string;
    duration?: number;
  } = {},
): void => {
  console.trace(err);
  globalNotifications.set({
    title,
    description:
      typeof err === 'string'
        ? err
        : err?.response?.data || err?.message?.toString() || fallback,
    // String, Axios, Error, Fallback
    show: true,
    type: 'error',
    duration,
  });
};

export const notify = ({
  title,
  description,
  duration,
}: {
  title?: string;
  description?: string;
  duration?: number;
}): void => {
  globalNotifications.set({
    title: title || 'Success',
    description,
    duration,
    show: true,
    type: 'success',
  });
};

export const loadingPopup = ({
  title,
  description,
  duration,
}: {
  title?: string;
  description?: string;
  duration?: number;
}): void => {
  globalNotifications.set({
    title: title || 'Loading...',
    description,
    duration,
    show: true,
    type: 'loading',
  });
};

export const warn = ({
  title,
  description,
  duration,
}: {
  title?: string;
  description?: string;
  duration?: number;
}): void => {
  globalNotifications.set({
    title: title || 'Warning',
    description,
    duration,
    show: true,
    type: 'warning',
  });
};
