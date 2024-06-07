import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

interface DimensionsContextProps {
  dimensions: Dimensions;
  setDimensions: (dimensions: Dimensions) => void;
}

const DimensionsContext = createContext<DimensionsContextProps | undefined>(undefined);

export const DimensionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 300, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DimensionsContext.Provider value={{ dimensions, setDimensions }}>
      {children}
    </DimensionsContext.Provider>
  );
};

export const useDimensions = (): DimensionsContextProps => {
  const context = useContext(DimensionsContext);
  if (!context) {
    throw new Error('useDimensions must be used within a DimensionsProvider');
  }

  return context;
};
