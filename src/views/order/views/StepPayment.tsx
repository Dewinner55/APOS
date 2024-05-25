// React Imports
import { useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'

// Component Imports
import CustomTabList from 'src/@core/components/mui/TabList'
import {User} from "src/@core/interface/user/interface";
import {Order} from "src/@core/interface/order/interface";
import {Language} from "src/@core/interface/language/interface";

interface StepPaymentProps {
  handleNext: () => void;
  userProfile: User;
  order: Order;
  languages: Language[];
}

const StepPayment = ({ handleNext, userProfile, order, languages }: StepPaymentProps) => {
  // States
  const [value, setValue] = useState<string>('credit-card');
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);
  const [openFade, setOpenFade] = useState<boolean>(true);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }

  useEffect(() => {
    if (!openFade) {
      setTimeout(() => {
        setOpenCollapse(false);
      }, 300);
    }
  }, [openFade]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8} className='flex flex-col gap-5'>
        <Collapse in={openCollapse}>
          <Fade in={openFade} timeout={{ exit: 300 }}>
            <Alert
              icon={<i className="ri-percent-line" />}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => { setOpenFade(false); }}
                >
                  <i className="ri-close-line" />
                </IconButton>
              }
              style={{ backgroundColor: 'var(--mui-palette-Alert-successStandardBg)', borderColor: 'var(--mui-palette-customColors-alertBorder)' }}
            >
              <AlertTitle>ПОДСКАЗКИ ДЛЯ АДМИНА</AlertTitle>
              <Typography color="success.main">- ЗДЕСЬ НАПИСАНЫ ПОДСКАЗКИ ДЛЯ АДМИНА</Typography>
              <Typography color="success.main">- 25% ЗДЕСЬ НАПИСАНЫ ПОДСКАЗКИ ДЛЯ АДМИНА</Typography>
            </Alert>
          </Fade>
        </Collapse>

        <TabContext value={value}>
          <CustomTabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='customized tabs example'
            pill='true'
          >
            <Tab value='credit-card' label='Card' />
            <Tab value='cash-on-delivery' label='Cash On Delivery' />
            <Tab value='gift-card' label='Gift Card' />
          </CustomTabList>

          <Grid container>
            <Grid item md={8} xs={12}>
              <TabPanel value='gift-card'>
                <Typography className='mbe-4' color='text.primary'> Использована подарочная карта </Typography>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField fullWidth type='number' label='Gift Card Number' placeholder='Gift Card Number' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth type='number' label='Gift Card Pin' placeholder='Gift Card Pin' />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant='contained' onClick={handleNext}> Redeem Gift Card </Button>
                  </Grid>
                </Grid>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Grid>

      <Grid item xs={12} lg={4}>
        <div style={{ borderColor: 'var(--mui-palette-customColors-inputBorder)', borderWidth: '1px', borderStyle: 'solid', backgroundColor: 'var(--mui-palette-background-paper)' }} className='border rounded'>
          <CardContent>
            <Typography className='font-medium mbe-4' color='text.primary'> Price Details </Typography>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between gap-2'>
                <Typography color='text.primary'>Order Total</Typography>
                <Typography>${order.total_price}</Typography>
              </div>
              <div className='flex items-center justify-between gap-2'>
                <Typography color='text.primary'>Delivery Charges</Typography>
                <div className='flex gap-2'>
                  <Typography color='text.disabled' className='line-through'>$5.00</Typography>
                  <Chip variant='filled' size='small' color='success' label='Free' />
                </div>
              </div>
            </div>
          </CardContent>
          <Divider />
          <CardContent className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between gap-2'>
                <Typography className='font-medium' color='text.primary'> Total </Typography>
                <Typography className='font-medium'>${order.total_price}</Typography>
              </div>
              <div className='flex items-center justify-between gap-2'>
                <Typography className='font-medium' color='text.primary'> Deliver to: </Typography>
                <Chip variant='filled' size='small' color='primary' label='Home' />
              </div>
            </div>
            <div>
              <Typography className='font-medium' color='text.primary'>{`${order.customer.first_name} (Default)`}, </Typography>
              <Typography>{order.address}</Typography>
              <Typography>Mobile : {order.customer.phone}</Typography>
            </div>
          </CardContent>
        </div>
      </Grid>
    </Grid>
  );
};

export default StepPayment;
