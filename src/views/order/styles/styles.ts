// MUI Imports
import {styled} from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import {Snackbar, Table} from '@mui/material'
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stepper, {StepperProps} from "@mui/material/Stepper";

export const StyledPagination = styled(Pagination)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '10px', // расстояние сверху
});

export const StyledTable = styled(Table)({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',

  '& [align="right"] > *': {
    textAlign: 'end',
  },
  '& [align="center"] > *': {
    textAlign: 'center',
  },

  '& thead': {
    textTransform: 'uppercase',
    color: 'var(--mui-palette-text-primary)',

    '& th': {
      fontWeight: 500,
      fontSize: '0.8125rem',
      letterSpacing: '0.2px',
      lineHeight: 1.8462,
      textAlign: 'start',
      blockSize: '56px',
      backgroundColor: 'var(--mui-palette-customColors-tableHeaderBg)',

      '&:not(:first-of-type):not(:last-of-type)': {
        paddingBlock: '0.5rem',
        paddingInline: '1rem',
      },
      '&:first-of-type': {
        '&:not(:has(input[type="checkbox"]))': {
          paddingBlock: '0.5rem',
          paddingInline: '1.25rem 1rem',
        },
        '&:has(input[type="checkbox"])': {
          paddingInlineStart: '0.6875rem',
        },
      },
      '&:last-of-type': {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBlock: '0.5rem',
        paddingInline: '1rem 1.25rem',
      },
    },
  },

  '& tbody': {
    color: 'var(--mui-palette-text-secondary)',

    '& th, & td': {
      fontSize: '0.9375rem',
      lineHeight: 1.4667,
      blockSize: '50px',
      '&:not(:first-of-type):not(:last-of-type)': {
        paddingBlock: '0.5rem',
        paddingInline: '1rem',
      },
      '&:first-of-type': {
        '&:not(:has(input[type="checkbox"]))': {
          paddingBlock: '0.5rem',
          paddingInline: '1.25rem 1rem',
        },
        '&:has(input[type="checkbox"])': {
          paddingInlineStart: '0.6875rem',
        },
      },
      '&:last-of-type': {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBlock: '0.5rem',
        paddingInline: '1rem 1.25rem',
      },
    },

    '& tr:not(:last-child)': {
      borderBottom: '1px solid var(--mui-palette-secondary-main)',
    },

    '& tr:hover': {
      backgroundColor: 'var(--mui-palette-background-default)',
    },
  },

  '& th:nth-of-type(3)': {
    width: '100%',
    textAlign: 'left',
    textAlignLast: 'left',
  },
});

export const StyledSnackbar = styled(Snackbar)(({color}) => ({
  '& .MuiSnackbarContent-root': {
    background: color || 'red',
    position: 'fixed',
    bottom: '2rem',
    zIndex: '11',
    color: 'white',
    textAlign: 'center',
    right: '1rem',
    width: '330px',
  },
}));


export const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: {xs: 300, sm: 400},
    backgroundСolor: '#312D4B'
  },
});

export const StyledDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '1.25rem',
  padding: '15px',
});

export const StyledForm = styled('form')({
  gap: '1.25rem',
  display: 'flex',
  flexDirection: 'column'
});

export const StyledTypography = styled(Typography)({
  paddingInline: '1.25rem',
  paddingBlock: '15px',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '1.125rem',
});

export const StyledButtonContainer = styled('div')({
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '1.25rem',
  gap: '1.25rem',

});

export const StyledButton = styled(Button)({
  position: 'static',
  '&:last-child': {},
});

export const iconStyle = {
  width: '40px',
  height: '25px',
  marginLeft: '10px',
};

export const eyeIconStyle = {
  color: '#eaeaea', // Цвет иконки "eye" по умолчанию
  transition: 'color 0.3s', // Плавное изменение цвета при hover
  '&:hover': {
    color: '#007bff', // Цвет иконки "eye" при наведении
  },
};

export const editIconStyle = {
  color: '#ffffff', // Цвет иконки "edit" по умолчанию
  transition: 'color 0.3s', // Плавное изменение цвета при hover
  '&:hover': {
    color: '#ff8800', // Цвет иконки "edit" при наведении
  },
};

export const deleteIconStyle = {
  color: '#ffffff', // Цвет иконки "delete" по умолчанию
  transition: 'color 0.3s', // Плавное изменение цвета при hover
  '&:hover': {
    color: '#ff0000', // Цвет иконки "delete" при наведении
  },
};

export const downloadIconStyle = {
  color: '#ffffff', // Цвет иконки "download" по умолчанию
  transition: 'color 0.3s', // Плавное изменение цвета при hover
  '&:hover': {
    color: 'rgba(0,255,0,0.76)', // Цвет иконки "download" при наведении
  },
};

export const CustomStepper = styled(Stepper)<StepperProps>(({ theme }) => ({
  justifyContent: 'center',
  '& .MuiStep-root': {
    '& + svg': {
      display: 'none',
      color: theme.palette.text.disabled
    },
    '& .MuiStepLabel-label': {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      svg: {
        marginRight: theme.spacing(1.5),
        fill: theme.palette.text.primary
      },
      '&.Mui-active, &.Mui-completed': {
        '& .MuiTypography-root': {
          color: theme.palette.primary.main
        },
        '& svg': {
          fill: theme.palette.primary.main
        }
      }
    },
    '&.Mui-completed + i': {
      color: `${theme.palette.primary.main} !important`
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
      '& + svg': {
        display: 'block'
      },
      '& .MuiStepLabel-label': {
        display: 'block'
      }
    }
  }
}));







