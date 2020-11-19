import React from 'react';
import RequestException from '../models/RequestException';

export interface Alert {
  open: boolean;
  ex?: RequestException;
  title?: string;
  message?: string;
  timeToClose?: number;
  type?: 'success' | 'warning' | 'error';
  positionY?: 'top' | 'bottom';
  positionX?: 'left' | 'center' | 'right';
}

const defaultAlert: Alert = {
  open: false,
};

export type AlertContextDefaultValueType = {
  alert?: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
};

const defaultContextValue: AlertContextDefaultValueType = {
  alert: defaultAlert,
  setAlert: () => defaultAlert,
};

export const AlertContext = React.createContext(defaultContextValue);

const AlertProvider = ({ children }: any): JSX.Element => {
  const [alert, setAlert] = React.useState(defaultAlert);
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
