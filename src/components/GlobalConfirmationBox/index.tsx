import { ConfirmationBoxData } from '../ConfirmationBox';
import { useGlobalConfirmationDispatch } from './context';

const dispatch = useGlobalConfirmationDispatch();

export const confirmation = (data: ConfirmationBoxData) =>
  dispatch({ type: 'SHOW', payload: data });
