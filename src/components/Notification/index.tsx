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
) => {
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
  return () => globalNotifications.show.set(false);
};

export const notify = ({
  title,
  description,
  duration,
}: {
  title?: string;
  description?: string;
  duration?: number;
}) => {
  globalNotifications.set({
    title: title || 'Success',
    description,
    duration,
    show: true,
    type: 'success',
  });
  return () => globalNotifications.show.set(false);
};

export const showLoading = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  globalNotifications.set({
    title: title || 'Loading...',
    description,
    duration: 1e20,
    show: true,
    type: 'loading',
  });
  return () => globalNotifications.show.set(false);
};

export const warn = ({
  title,
  description,
  duration,
}: {
  title?: string;
  description?: string;
  duration?: number;
}) => {
  globalNotifications.set({
    title: title || 'Warning',
    description,
    duration,
    show: true,
    type: 'warning',
  });
  return () => globalNotifications.show.set(false);
};

export const closeNotification = () => globalNotifications.show.set(false);
