import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Action =
    | { type: 'SHOW'; payload: Omit<GlobalConfirmationState, 'show'> }
    | { type: 'HIDE' };

export interface GlobalConfirmationState {
    show: boolean,
    title: string, 
    description: string, 
    type?: string,
    onConfirm: () => Promise<void> | void, 
    onCancel?: () => Promise<void> | void
}

export const GlobalConfirmationContext = createContext<GlobalConfirmationState | undefined>(
    undefined,
);
export const GlobalConfirmationDispatchContext = createContext<
    React.Dispatch<Action> | undefined
>(undefined);

function globalConfirmationReducer(
    state: GlobalConfirmationState,
    action: Action,
): GlobalConfirmationState {
    switch (action.type) {
        case 'SHOW':
            return { ...state, ...action.payload, show: true };
        case 'HIDE':
            return { ...state, show: false };
        default:
            return state;
    }
}

const initialGlobalConfirmation: GlobalConfirmationState = {
    show: false,
    title: '',
    description: '',
    type: 'warning',
    onConfirm: () => {},
    onCancel: () => {},
};

export function GlobalConfirmationProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(
        globalConfirmationReducer,
        initialGlobalConfirmation,
    );

    return (
        <GlobalConfirmationContext.Provider value={state}>
            <GlobalConfirmationDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalConfirmationDispatchContext.Provider>
        </GlobalConfirmationContext.Provider>
    );
}

export function useGlobalConfirmation() {
    const state = useContext(GlobalConfirmationContext);
    if (state === undefined) {
        throw new Error(
            'useGlobalConfirmation must be used within a GlobalConfirmationProvider',
        );
    }
    return state;
}

export function useGlobalConfirmationDispatch() {
    const dispatch = useContext(GlobalConfirmationDispatchContext);
    if (dispatch === undefined) {
        throw new Error(
            'useGlobalConfirmationDispatch must be used within a GlobalConfirmationProvider',
        );
    }
    return dispatch;
}
