import { styled } from "@mui/material/styles";
import { Button } from '@mui/material';

export const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

export const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  padding: '4px 8px',
  minWidth: 'auto',
  borderColor: '#2196f3',
  color: '#2196f3',
  '&:hover': {
    borderColor: '#1976d2',
    color: '#1976d2',
  },
  fontSize: '0.75rem', // Меньший размер текста для кнопки
}));
