import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

const useTimeframe = (initialValue: string) => {
  const [timeframe, setTimeframe] = useState<string>(initialValue);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setTimeframe(event.target.value as string);
  };

  return { timeframe, handleChange };
};

export default useTimeframe;
