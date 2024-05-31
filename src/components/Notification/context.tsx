import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Action =
  | { type: 'SHOW'; payload: Omit<NotificationState, 'show'> }
  | { type: 'HIDE' };

export interface NotificationState {
  show: boolean;
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  title: string;
  message: string;
  duration?: number;
}

export const NotificationContext = createContext<NotificationState | undefined>(
  undefined,
);
export const NotificationDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

function notificationReducer(
  state: NotificationState,
  action: Action,
): NotificationState {
  switch (action.type) {
    case 'SHOW':
      return { ...state, ...action.payload, show: true };
    case 'HIDE':
      return { ...state, show: false };
    default:
      return state;
  }
}

const initialNotification: NotificationState = {
  show: false,
  type: 'success',
  title: '',
  message: '',
  duration: 2000,
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    notificationReducer,
    initialNotification,
  );

  return (
    <NotificationContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const state = useContext(NotificationContext);
  if (state === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return state;
}

export function useNotificationDispatch() {
  const dispatch = useContext(NotificationDispatchContext);
  if (dispatch === undefined) {
    throw new Error(
      'useNotificationDispatch must be used within a NotificationProvider',
    );
  }
  return dispatch;
}
