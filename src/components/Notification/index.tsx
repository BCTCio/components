import { useNotificationDispatch } from "./context";

const notificationDispatch = useNotificationDispatch();

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
  
  notificationDispatch({
    type: 'SHOW',
    payload: {
      title,
      message: err?.message || fallback || 'An error occurred',
      duration,
      type: 'error',
    },
  });

  return () => notificationDispatch({ type: 'HIDE' });
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
  notificationDispatch({
    type: 'SHOW',
    payload: {
      title: title || '',
      message: description || '',
      duration,
      type: 'success',
    },
  });

  return () => notificationDispatch({ type: 'HIDE' });
};

export const showLoading = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  notificationDispatch({
    type: 'SHOW',
    payload: {
      title: title || '',
      message: description || '',
      type: 'loading',
      duration: 1e20,
    },
  });

  return () => notificationDispatch({ type: 'HIDE' });
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
  notificationDispatch({
    type: 'SHOW',
    payload: {
      title: title || '',
      message: description || '',
      duration,
      type: 'warning',
    },
  });

  return () => notificationDispatch({ type: 'HIDE' });
};

export const closeNotification = () => notificationDispatch({ type: 'HIDE' });
