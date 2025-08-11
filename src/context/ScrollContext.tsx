import { createContext, useContext, useState } from 'react';

type ScrollContextType = {
  scroll: number;
  setScroll: React.Dispatch<React.SetStateAction<number>>;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [scroll, setScroll] = useState<number>(0);

  return (
    <ScrollContext.Provider value={{ scroll, setScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) throw new Error('useScroll must be used within a ScrollProvider');
  return context;
};
