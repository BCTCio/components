import { Dispatch } from 'react';
import { ConfirmationBoxData } from '../ConfirmationBox';

export const confirmation = (data: ConfirmationBoxData, dispatch: Dispatch<any>) =>
  dispatch({ type: 'SHOW', payload: data });
