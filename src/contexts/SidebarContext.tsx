import React from 'react';

export type SidebarContextDefaultValueType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContextValue: SidebarContextDefaultValueType = {
  open: false,
  setOpen: () => false,
};

export const SidebarContext = React.createContext(defaultContextValue);

const SidebarProvider = ({ children }: any): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
