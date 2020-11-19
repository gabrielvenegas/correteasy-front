import React from 'react';

export type ModalContextDefaultValueType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContextValue: ModalContextDefaultValueType = {
  open: false,
  setOpen: () => false,
};

export const ModalContext = React.createContext(defaultContextValue);

const ModalProvider = ({ children }: any): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
