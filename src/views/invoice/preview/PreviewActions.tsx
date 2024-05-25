'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'


// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import AddPaymentDrawer from "src/views/invoice/shared/AddPaymentDrawer";
import SendInvoiceDrawer from "src/views/invoice/shared/SendInvoiceDrawer";
import {User} from "src/@core/interface/user/interface";
import {Order} from "src/@core/interface/order/interface";
import {Language} from "src/@core/interface/language/interface";
import {InvoiceType} from "src/@core/types/invoice/invoiceTypes";

// Type Imports


// Component Imports


// Util Imports


interface Props {
  userProfile: User;
  order: Order;
  languages: Language[];
}

const PreviewActions = ({ userProfile, order, languages }: Props) => {
  // States
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false);

  return (
    <>
      <Card elevation={1}>
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
          <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
            Download
          </Button>
          <div className='flex items-center gap-4'>
            <Link href={`/apps/invoice/print/${order.id}`} passHref>
              <Button
                fullWidth
                target='_blank'
                color='secondary'
                variant='outlined'
                className='capitalize'
              >
                Print
              </Button>
            </Link>
            <Link href={`/apps/invoice/edit/${order.id}`} passHref>
              <Button
                fullWidth
                color='secondary'
                variant='outlined'
                className='capitalize'
              >
                Edit
              </Button>
            </Link>
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
    </>
  );
};

export default PreviewActions;
