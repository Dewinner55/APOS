import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface VisibilityContextType {
  isHidden: boolean;
  toggleVisibility: () => void;
}

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const VisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    try {
      const storedVisibility = Cookies.get('visibility');
      if (storedVisibility) {
        const parsedVisibility = JSON.parse(storedVisibility);
        if (typeof parsedVisibility.isHidden === 'boolean') {
          setIsHidden(parsedVisibility.isHidden);
        } else {
          throw new Error('Invalid cookie value');
        }
      }
    } catch (error) {
      console.error('Error parsing visibility cookie:', error);

      Cookies.set('visibility', JSON.stringify({ isHidden: false }), { expires: 7 });
    }
  }, []);

  const toggleVisibility = () => {
    const newVisibility = !isHidden;
    setIsHidden(newVisibility);
    Cookies.set('visibility', JSON.stringify({ isHidden: newVisibility }), { expires: 7 });
  };

  return (
    <VisibilityContext.Provider value={{ isHidden, toggleVisibility }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = (): VisibilityContextType => {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }

  return context;
};
