'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import AddPaymentDrawer from "src/views/invoice/shared/AddPaymentDrawer";
import SendInvoiceDrawer from "src/views/invoice/shared/SendInvoiceDrawer";
import {User} from "src/@core/interface/user/interface";
import {Order} from "src/@core/interface/order/interface";
import {Language} from "src/@core/interface/language/interface";


// Component Imports


interface Props {
  userProfile: User;
  order: Order;
  languages: Language[];
}

const EditActions = ({ userProfile, order, languages }: Props) => {
  // States
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false)
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <Button
              fullWidth
              variant='contained'
              className='capitalize'
              startIcon={<i className='ri-send-plane-line' />}
              onClick={() => setSendDrawerOpen(true)}
            >
              Send Invoice
            </Button>
            <div className='flex items-center gap-4'>
              {/*<Button*/}
              {/*  fullWidth*/}
              {/*  component={Link}*/}
              {/*  color='secondary'*/}
              {/*  variant='outlined'*/}
              {/*  className='capitalize'*/}
              {/*>*/}
              {/*  Preview*/}
              {/*</Button>*/}
              <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
                Save
              </Button>
            </div>
            <Button
              fullWidth
              color='success'
              variant='contained'
              className='capitalize'
              onClick={() => setPaymentDrawerOpen(true)}
              startIcon={<i className='ri-money-dollar-circle-line' />}
            >
              Add Payment
            </Button>
          </CardContent>
        </Card>
        <AddPaymentDrawer open={paymentDrawerOpen} handleClose={() => setPaymentDrawerOpen(false)} />
        <SendInvoiceDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth className='mbe-4'>
          <InputLabel id='payment-select'>Accept payments via</InputLabel>
          <Select fullWidth defaultValue='Internet Banking' label='Accept payments via' labelId='payment-select'>
            <MenuItem value='Internet Banking'>Internet Banking</MenuItem>
            <MenuItem value='Debit Card'>Debit Card</MenuItem>
            <MenuItem value='Credit Card'>Credit Card</MenuItem>
            <MenuItem value='Paypal'>Paypal</MenuItem>
            <MenuItem value='UPI Transfer'>UPI Transfer</MenuItem>
          </Select>
        </FormControl>
        <div className='flex items-center justify-between gap-6'>
          <InputLabel htmlFor='invoice-edit-payment-terms' className='cursor-pointer'>
            Payment Terms
          </InputLabel>
          <Switch defaultChecked id='invoice-edit-payment-terms' />
        </div>
        <div className='flex items-center justify-between gap-6'>
          <InputLabel htmlFor='invoice-edit-client-notes' className='cursor-pointer'>
            Client Notes
          </InputLabel>
          <Switch id='invoice-edit-client-notes' />
        </div>
        <div className='flex items-center justify-between gap-6'>
          <InputLabel htmlFor='invoice-edit-payment-stub' className='cursor-pointer'>
            Payment Stub
          </InputLabel>
          <Switch id='invoice-edit-payment-stub' />
        </div>
      </Grid>
    </Grid>
  )
}

export default EditActions
