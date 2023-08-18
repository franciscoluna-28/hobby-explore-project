import React, { createContext, useState } from "react";

// Definir la interfaz para el contexto de la barra lateral si es necesario
interface SidebarContextType {
  toggleOpen: () => void;
  isOpen: boolean;
}
const SidebarContext = createContext<SidebarContextType | null>(null);

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const sidebarContextValue: SidebarContextType = {
    toggleOpen,
    isOpen,
  };

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarContext;
