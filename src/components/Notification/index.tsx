import { Dispatch } from "react";

export const error = (
  err: any,
  {
    title = 'Something went wrong',
    fallback,
    duration,
    dispatch,
  }: {
    title?: string;
    fallback?: string;
    duration?: number;
    dispatch: Dispatch<any> | null;
  } = {dispatch: null},
) => {
  console.trace(err);
  
  if (!dispatch) {
    throw new Error("Dispatch function is required.");
  }
  
  dispatch({
    type: 'SHOW',
    payload: {
      title,
      message: err?.message || fallback || 'An error occurred',
      duration,
      type: 'error',
    },
  });

  return () => dispatch({ type: 'HIDE' });
};

export const notify = ({
  title,
  description,
  duration,
  dispatch
}: {
  title?: string;
  description?: string;
  duration?: number;
  dispatch: Dispatch<any> | null;
}) => {
  if (!dispatch) {
    throw new Error("Dispatch function is required.");
  }

  dispatch({
    type: 'SHOW',
    payload: {
      title: title || '',
      message: description || '',
      duration,
      type: 'success',
    },
  });
  
  return () => dispatch({ type: 'HIDE' });
};

export const showLoading = ({
  title,
  description,
  dispatch
}: {
  title?: string;
  description?: string;
  dispatch: Dispatch<any> | null;
}) => {
  if (!dispatch) {
    throw new Error("Dispatch function is required.");
  }

  dispatch({
    type: 'SHOW',
    payload: {
      title: title || '',
      message: description || '',
      type: 'loading',
      duration: 1e20,
    },
  });

  return () => dispatch({ type: 'HIDE' });
};

export const warn = ({
  title,
  description,
  duration,
  dispatch
}: {
  title?: string;
  description?: string;
  duration?: number;
  dispatch: Dispatch<any> | null;
}) => {
  if (!dispatch) {
    throw new Error("Dispatch function is required.");
  }

  dispatch({
    type: 'SHOW',
    payload: {
      title: title || '',
      message: description || '',
      duration,
      type: 'warning',
    },
  });

  return () => dispatch({ type: 'HIDE' });
};

export const closeNotification = (dispatch: Dispatch<any>) => dispatch({ type: 'HIDE' });