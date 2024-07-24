import type { Dispatch, SetStateAction } from 'react';
import type { IKeys } from './global';

export interface AlertProps {
  alert: string;
  setAlert: Dispatch<SetStateAction<string | null>>;
}

export interface ErrorsProps {
  errors: IKeys<string>;
  setErrors: Dispatch<SetStateAction<IKeys<string> | null>>;
}

export interface MessageProps {
  id: string;
  setAlert: Dispatch<SetStateAction<string | null>>;
}
