// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography, {TypographyProps} from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import {styled, useTheme} from "@mui/material/styles";
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon  } from '@mui/material';
import ExpandMoreIcon from 'mdi-material-ui/ChevronDown';
import BullhornOutline from 'mdi-material-ui/BullhornOutline';
import React from "react";
import Button from "@mui/material/Button";

// Styled component for the trophy image
const TypographyCustom = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.text.primary
}))

const FooterContent = () => {
  // ** Hook
  const theme = useTheme()

  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {hidden ? (
        <>
          {/* Группа 1: Global Joy. Make It's Real и Contact */}
          <Box sx={{ padding: '20px 30px', color: '#2f2f2f', backgroundColor: theme.palette.background.default }}>
            <TypographyCustom variant="h1" sx={{ textTransform: 'capitalize', fontSize: '1.3rem', mb: '1.3em' }}>
              Global Joy. Make it's Real
            </TypographyCustom>
            <TypographyCustom variant='body2' sx={{ letterSpacing: '0.25px' }}>
              Best seller of the month
            </TypographyCustom>
            <TypographyCustom variant="h2" sx={{ fontSize: '15px', fontWeight: 400, color: theme.palette.text.primary  }}>
              Contact
            </TypographyCustom>
            <TypographyCustom>
              5534 Somewhere In. The World 22193-10212<br/>
              <a href="mailto:example@gmail.com" className="footer__btn">
                <Button style={{marginTop: '10px'}} size='small' variant='contained'>
                  Email Us
                </Button>
              </a>
            </TypographyCustom>
          </Box>

          <Accordion sx={{
            marginBottom: '10px',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #9155FD 0%, #FF9800 100%)'
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderRadius: '10px',
                '&.Mui-expanded': {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
                }
              }}
            >
              <TypographyCustom variant="h2" className="nav__title" sx={{
                fontWeight: 400,
                fontSize: '15px',
                mb: '1em',
                color: '#fff'
              }}>
                Media
              </TypographyCustom>
            </AccordionSummary>
            <AccordionDetails sx={{
              borderRadius: '0 0 10px 10px',
              display: 'flex',
              justifyContent: 'space-between' // Распределяет контент на две колонки
            }}>
              <ul className="nav__ul" style={{
                listStyleType: 'none',
                padding: 0,
                flexGrow: 1 // Убедитесь, что у списка есть пространство для роста
              }}>
                {['Online', 'Print', 'Alternative Ads'].map((item) => (
                  <li key={item} style={{
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '8px 0'
                  }}>
                    <Link href="#" sx={{
                      textDecoration: 'none', // Убираем подчеркивание
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Box component="span" sx={{ marginRight: '10px' }}>
                        <SvgIcon viewBox="0 0 24 24">
                          <BullhornOutline />
                        </SvgIcon>
                      </Box>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <img src={`/images/logos/aws.png`} alt='package offers' style={{
                width: '150px', // Указываем ширину изображения
                alignSelf: 'center' // Выравнивание изображения по центру колонки
              }} />
            </AccordionDetails>
          </Accordion>

          {/* Аккордеон для группы 3: Technology */}
          <Accordion sx={{
            marginBottom: '10px',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #9155FD 0%, #FF9800 100%)',
            position: 'relative' // Для позиционирования изображения
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderRadius: '10px',
                '&.Mui-expanded': {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
                }
              }}
            >
              <TypographyCustom variant="h2" className="nav__title" sx={{
                fontWeight: 400,
                fontSize: '15px',
                mb: '1em',
                color: '#fff'
              }}>
                Technology
              </TypographyCustom>
            </AccordionSummary>
            <AccordionDetails sx={{
              borderRadius: '0 0 10px 10px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <ul style={{ listStyleType: 'none', padding: 0, flexGrow: 1 }}>
                {['Hardware Design', 'Software Design', 'Digital Signage', 'Automation', 'Artificial Intelligence', 'IoT'].map((item) => (
                  <li key={item} style={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    padding: '8px 0',
                    color: '#fff'
                  }}>
                    <Link href="#" sx={{
                      textDecoration: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <SvgIcon sx={{ marginRight: '10px' }} viewBox="0 0 24 24">
                        <BullhornOutline /> {/* Placeholder icon */}
                      </SvgIcon>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <img src={`/images/logos/aws.png`} alt='package offers' style={{
                width: '150px',
                alignSelf: 'center'
              }} />
            </AccordionDetails>
          </Accordion>

          {/* Аккордеон для группы 4: Legal */}
          <Accordion sx={{
            marginBottom: '10px',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #9155FD 0%, #FF9800 100%)',
            position: 'relative'
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderRadius: '10px',
                '&.Mui-expanded': {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
                }
              }}
            >
              <TypographyCustom variant="h2" className="nav__title" sx={{
                fontWeight: 400,
                fontSize: '15px',
                mb: '1em',
                color: '#fff'
              }}>
                Legal
              </TypographyCustom>
            </AccordionSummary>
            <AccordionDetails sx={{
              borderRadius: '0 0 10px 10px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <ul style={{ listStyleType: 'none', padding: 0, flexGrow: 1 }}>
                {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((item) => (
                  <li key={item} style={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    padding: '8px 0',
                    color: '#fff'
                  }}>
                    <Link href="#" sx={{
                      textDecoration: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <img src={`/images/logos/aws.png`} alt='package offers' style={{
                width: '150px',
                alignSelf: 'center'
              }} />
            </AccordionDetails>
          </Accordion>

          {/* Дополнительная информация */}
          <Box sx={{padding: '20px 30px', color: '#999', backgroundColor: theme.palette.background.default }}>
            <TypographyCustom variant="body1" sx={{ mb: '1em' }}>
              &copy; {new Date().getFullYear()} Something. All rights reserved.
            </TypographyCustom>
            <div className="legal__links">
              <TypographyCustom variant="body1" sx={{ color: '#999' }}>
                Made with <span className="heart">♥</span> remotely from Anywhere
              </TypographyCustom>
            </div>
          </Box>
        </>
      ) : (

        // Десктопная версия
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '30px 30px 20px 30px', color: '#2f2f2f', backgroundColor: theme.palette.background.default }}>
            {/* Группа 1: Global Joy. Make It's Real и Contact */}
            <Box sx={{ flex: '1 35%', marginBottom: '2em' }}>
              <TypographyCustom variant="h1" sx={{ fontFamily: 'Pacifico, cursive', textTransform: 'capitalize', fontSize: '1.5rem', mb: '1.3em' }}>
                Global Joy. Make it's Real
              </TypographyCustom>
              <TypographyCustom variant="h2" sx={{ fontSize: '15px', fontWeight: 400 }}>
                Contact
              </TypographyCustom>
              <TypographyCustom>
                5534 Somewhere In. The World 22193-10212<br/>
                <a href="mailto:example@gmail.com" style={{ textDecoration: 'none' }} className="footer__btn">
                  <Button style={{marginTop: '10px'}} size='small' variant='contained' >
                    Email Us
                  </Button>
                </a>
              </TypographyCustom>
            </Box>

            {/* Группа 2: Media */}
            <Box sx={{ flex: '1 25%', flexBasis: '21%', marginBottom: '2em', padding: '0px 0px 0px 40px' }}>
              <TypographyCustom variant="h2" className="nav__title" sx={{ fontWeight: 400, fontSize: '15px', mb: '1em' }}>
                Media
              </TypographyCustom>
              <ul className="nav__ul" style={{listStyleType: 'none', padding: 0}}>
                <li style={{marginBottom: '5px'}}><Link href="#" sx={{textDecoration: 'none'}}>Online</Link></li>
                <li style={{marginBottom: '5px'}}><Link href="#" sx={{textDecoration: 'none'}}>Print</Link></li>
                <li><Link href="#" sx={{textDecoration: 'none'}}>Alternative Ads</Link></li>
              </ul>
            </Box>

            {/* Группа 3: Technology */}
            <Box sx={{flex: '1 25%', flexBasis: '21%', marginBottom: '2em', padding: '0px 0px 0px 40px'}}>
              <TypographyCustom variant="h2" className="nav__title" sx={{fontWeight: 400, fontSize: '15px', mb: '1em'}}>
                Technology
              </TypographyCustom>
              <ul className="nav__ul" style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{marginBottom: '5px'}}><Link href="#" sx={{ textDecoration: 'none' }}>Hardware Design</Link></li>
                <li style={{marginBottom: '5px'}}><Link href="#" sx={{ textDecoration: 'none' }}>Software Design</Link></li>
                <li style={{marginBottom: '5px'}}><Link href="#" sx={{ textDecoration: 'none' }}>Digital Signage</Link></li>
                <li style={{marginBottom: '5px'}}><Link href="#" sx={{ textDecoration: 'none' }}>Automation</Link></li>
                <li style={{marginBottom: '5px'}}><Link href="#" sx={{ textDecoration: 'none' }}>Artificial Intelligence</Link></li>
                <li><Link href="#" sx={{ textDecoration: 'none' }}>IoT</Link></li>
              </ul>
            </Box>

            {/* Группа 4: Legal */}
            <Box sx={{ flex: '1 25%', flexBasis: '21%', marginBottom: '2em', padding: '0px 0px 0px 40px' }}>
              <TypographyCustom variant="h2" className="nav__title" sx={{ fontWeight: 400, fontSize: '15px', mb: '1em' }}>
                Legal
              </TypographyCustom>
              <ul className="nav__ul" style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{marginBottom: '5px'}}><Link href="#" sx={{ textDecoration: 'none' }}>Privacy Policy</Link></li>
                <li style={{marginBottom: '5px'}}><Link href="#" sx={{ textDecoration: 'none' }}>Terms of Use</Link></li>
                <li><Link href="#" sx={{ textDecoration: 'none' }}>Sitemap</Link></li>
              </ul>
            </Box>
          </Box>

          {/* Дополнительная информация */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '20px 30px', color: '#999', backgroundColor: theme.palette.background.default }}>
            <TypographyCustom variant="body1" sx={{ mb: '1em' }}>
              &copy; {new Date().getFullYear()} Все права защищены. <span className="heart"></span>TM Global Joy
            </TypographyCustom>
          </Box>
        </>
      )}
    </>
  );
}

export default FooterContent;
