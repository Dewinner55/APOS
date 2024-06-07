import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon } from '@mui/material';
import ExpandMoreIcon from 'mdi-material-ui/ChevronDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmailOutline from 'mdi-material-ui/EmailOutline';
import Button from '@mui/material/Button';

const TypographyCustom = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.secondary,
  fontSize: '1rem',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(1),
  fontSize: '0.875rem',
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: theme.spacing(1),
  },
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
  },
  '&:focus': {
    textDecoration: 'underline',
    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
  },
  '&:active': {
    color: theme.palette.primary.light,
  },
}));

const ContactButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:focus': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:active': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const FooterContent = () => {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {hidden ? (
        <>
          <Box
            sx={{
              padding: '20px 30px',
              color: theme.palette.mode === 'dark' ? '#fff' : '#2f2f2f',
              backgroundColor: theme.palette.background.default,
            }}
          >
            <TypographyCustom
              variant='h6'
              sx={{
                fontFamily: 'Pacifico, cursive',
                textTransform: 'capitalize',
                fontSize: '1.5rem',
                mb: '1.3em',
              }}
            >
              Global Joy. Make it Real
            </TypographyCustom>
            <TypographyCustom
              variant='body2'
              sx={{ letterSpacing: '0.25px', mb: '1em' }}
            >
              Best seller of the month
            </TypographyCustom>
            <TypographyCustom variant='body2' sx={{ fontWeight: 400 }}>
              Contact
            </TypographyCustom>
            <TypographyCustom variant='body2'>
              5534 Somewhere In. The World 22193-10212
              <br />
              <a href='mailto:example@gmail.com' className='footer__btn'>
                <ContactButton size='small' variant='contained'>
                  <EmailOutline sx={{ marginRight: theme.spacing(1) }} />
                  Email Us
                </ContactButton>
              </a>
            </TypographyCustom>
          </Box>
          <AccordionSection
            title='Management'
            items={[
              { label: 'User Management', icon: <AccountCircleIcon /> },
              { label: 'Product Management', icon: <StoreIcon /> },
              { label: 'Order Management', icon: <ShoppingCartIcon /> },
              { label: 'Shipping Management', icon: <LocalShippingIcon /> },
            ]}
          />
          <AccordionSection
            title='Analytics'
            items={[
              { label: 'Sales Reports', icon: <AssessmentIcon /> },
              { label: 'User Statistics', icon: <AssessmentIcon /> },
              { label: 'Product Performance', icon: <AssessmentIcon /> },
            ]}
          />
          <AccordionSection
            title='Settings'
            items={[
              { label: 'General Settings', icon: <SettingsIcon /> },
              { label: 'Profile Settings', icon: <SettingsIcon /> },
              { label: 'Notification Settings', icon: <SettingsIcon /> },
            ]}
          />
          <Box
            sx={{
              padding: '20px 30px',
              color: '#999',
              backgroundColor: theme.palette.background.default,
            }}
          >
            <TypographyCustom variant='body2' sx={{ mb: '1em' }}>
              &copy; {new Date().getFullYear()} Global Joy. All rights reserved.
            </TypographyCustom>
            <TypographyCustom variant='body2'>
              Made with <span className='heart'>♥</span> remotely from Anywhere
            </TypographyCustom>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '30px 30px 20px 30px',
            color: theme.palette.mode === 'dark' ? '#fff' : '#2f2f2f',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box sx={{ flex: '1 35%', marginBottom: '2em' }}>
            <TypographyCustom
              variant='h4'
              sx={{
                fontFamily: 'Pacifico, cursive',
                textTransform: 'capitalize',
                fontSize: '2rem',
                mb: '1.3em',
              }}
            >
              Global Joy. Make it Real
            </TypographyCustom>
            <TypographyCustom variant='body2' sx={{ fontWeight: 400 }}>
              Contact
            </TypographyCustom>
            <TypographyCustom variant='body2'>
              5534 Somewhere In. The World 22193-10212
              <br />
              <a href='mailto:example@gmail.com' style={{ textDecoration: 'none' }} className='footer__btn'>
                <ContactButton size='small' variant='contained'>
                  <EmailOutline sx={{ marginRight: theme.spacing(1) }} />
                  Email Us
                </ContactButton>
              </a>
            </TypographyCustom>
          </Box>
          <FooterSection
            title='Management'
            items={[
              { label: 'User Management', icon: <AccountCircleIcon /> },
              { label: 'Product Management', icon: <StoreIcon /> },
              { label: 'Order Management', icon: <ShoppingCartIcon /> },
              { label: 'Shipping Management', icon: <LocalShippingIcon /> },
            ]}
          />
          <FooterSection
            title='Analytics'
            items={[
              { label: 'Sales Reports', icon: <AssessmentIcon /> },
              { label: 'User Statistics', icon: <AssessmentIcon /> },
              { label: 'Product Performance', icon: <AssessmentIcon /> },
            ]}
          />
          <FooterSection
            title='Settings'
            items={[
              { label: 'General Settings', icon: <SettingsIcon /> },
              { label: 'Profile Settings', icon: <SettingsIcon /> },
              { label: 'Notification Settings', icon: <SettingsIcon /> },
            ]}
          />
        </Box>
      )}
    </>
  );
};

const FooterSection = ({ title, items }: { title: string; items: { label: string; icon: React.ReactNode }[] }) => (
  <Box sx={{ flex: '1 25%', flexBasis: '21%', marginBottom: '2em', padding: '0px 0px 0px 40px' }}>
    <SectionTitle variant='h6'>{title}</SectionTitle>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {items.map((item) => (
        <li key={item.label} style={{ marginBottom: '5px' }}>
          <FooterLink href='#'>
            {item.icon}
            {item.label}
          </FooterLink>
        </li>
      ))}
    </ul>
  </Box>
);

const AccordionSection = ({ title, items }: { title: string; items: { label: string; icon: React.ReactNode }[] }) => (
  <Accordion
    sx={{
      marginBottom: '10px',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      background: 'linear-gradient(135deg, #7C4DFF 0%, #FFC107 100%)',
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={{
        borderRadius: '10px',
        '&.Mui-expanded': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
    >
      <TypographyCustom variant='body2' sx={{ fontWeight: 400, fontSize: '1rem', color: '#fff' }}>
        {title}
      </TypographyCustom>
    </AccordionSummary>
    <AccordionDetails sx={{ borderRadius: '0 0 10px 10px', display: 'flex', justifyContent: 'space-between' }}>
      <ul style={{ listStyleType: 'none', padding: 0, flexGrow: 1 }}>
        {items.map((item) => (
          <li key={item.label} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', padding: '8px 0', color: '#fff' }}>
            <FooterLink href='#' sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
              {item.icon}
              {item.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </AccordionDetails>
  </Accordion>
);

export default FooterContent;
