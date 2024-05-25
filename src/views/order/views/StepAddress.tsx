// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// Component Imports
import CustomInputHorizontal from '@core/components/custom-inputs/Horizontal'
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import OpenDialogOnElementClick from "src/@core/components/dialogs/OpenDialogOnElementClick";
import AddEditAddress from "src/@core/components/dialogs/add-edit-address";

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Address, DeliverySpeed, Order} from "src/@core/interface/order/interface";
import {Language} from "src/@core/interface/language/interface";


interface StepAddressProps {
  handleNext: () => void;
  userProfile: User;
  order: Order;
  languages: Language[];
}

const StepAddress = ({ handleNext, order }: StepAddressProps) => {
  const address: Address = {
    title: `${order.customer.first_name} (Default)`,
    meta: <Chip size='small' variant='filled' label='Home' color='primary' />,
    value: 'home',
    isSelected: true,
    content: (
      <div className='flex flex-col gap-3'>
        <Typography variant='body2'>
          {order.address}. <br /> Mobile: {order.customer.phone}
        </Typography>
        <Typography variant='body2'>
          Cash / Card on delivery available
        </Typography>
      </div>
    )
  };

  const deliverySpeeds: DeliverySpeed[] = [
    {
      isSelected: true,
      value: 'standard',
      title: 'Standard',
      asset: 'ИКОНКА',
      content: (
        <>
          <Chip size='small' variant='filled' label='Free' color='success' className='absolute right-5' />
          <Typography variant='body2' className='my-auto'>Get your product in 1 Week.</Typography>
        </>
      )
    },
    {
      value: 'express',
      title: 'Express',
      asset: 'ИКОНКА',
      content: (
        <>
          <Chip label='$10' variant='filled' size='small' color='secondary' className='absolute right-5' />
          <Typography variant='body2' className='my-auto'>Get your product in 3-4 days.</Typography>
        </>
      )
    },
    {
      value: 'overnight',
      title: 'Overnight',
      asset: 'ИКОНКА',
      content: (
        <>
          <Chip label='$15' variant='filled' size='small' color='secondary' className='absolute right-5' />
          <Typography variant='body2' className='my-auto'>Get your product in 1 day.</Typography>
        </>
      )
    }
  ];

  // Инициализация состояния на основе данных
  const initialSelectedOption: string = address.value;
  const buttonProps = { variant: 'outlined', children: 'Add New Address' };

  const [selectedOption, setSelectedOption] = useState<string>(initialSelectedOption);
  const [selectedSpeed, setSelectedSpeed] = useState<string>('standard');

  const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelectedOption(prop);
    } else {
      setSelectedOption((prop.target as HTMLInputElement).value);
    }
  };

  const handleSpeedChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelectedSpeed(prop);
    } else {
      setSelectedSpeed((prop.target as HTMLInputElement).value);
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8} className='flex flex-col gap-6'>
        <div className='flex flex-col items-start gap-4'>
          <Typography color='text.primary' className='font-medium'>
            Select your preferable address
          </Typography>
          <Grid container spacing={6}>
            <CustomInputHorizontal
              type='radio'
              data={address}
              gridProps={{ sm: 6, xs: 12 }}
              selected={selectedOption}
              name='custom-radios-basic'
              handleChange={handleOptionChange}
            />
          </Grid>
        </div>
        <Divider />
        <div className='flex flex-col items-start gap-4'>
          <Typography color='text.primary' className='font-medium'>
            Choose Delivery Speed
          </Typography>
          <Grid container spacing={6}>
            {deliverySpeeds.map((item, index) => (
              <CustomInputVertical
                type='radio'
                key={index}
                gridProps={{ sm: 4, xs: 12 }}
                selected={selectedSpeed}
                name='custom-radios-basic'
                handleChange={handleSpeedChange}
                data={item}
              />
            ))}
          </Grid>
        </div>
      </Grid>

      <Grid item xs={12} lg={4} className='flex flex-col gap-4'>
        <div style={{
          borderColor: 'var(--mui-palette-customColors-inputBorder)',
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: 'var(--mui-palette-background-paper)'
        }} className='border rounded'>
          <CardContent className='flex flex-col gap-4'>
            <Typography className='font-medium' color='text.primary'>Estimated Delivery Date</Typography>
            {order.products.map((product, index) => (
              <div key={index} className='flex gap-4 items-center'>
                <img width={60} height={60} src={product.product.product_info.info_0.images[0]}
                     alt={product.product.translate_content[0].content.name}/>
                <div>
                  <Typography>{product.product.translate_content[0].content.name}</Typography>
                  <Typography className='font-medium'>Estimated Delivery: {new Date().toLocaleDateString()}</Typography>
                </div>
              </div>
            ))}
          </CardContent>
          <Divider/>
          <CardContent className='flex flex-col gap-4'>
            <Typography className='font-medium' color='text.primary'>Price Details</Typography>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 justify-between flex-wrap'>
                <Typography color='text.primary'>Order Total</Typography>
                <Typography>${order.total_price}</Typography>
              </div>
              <div className='flex justify-between flex-wrap'>
                <Typography color='text.primary'>Delivery Charges</Typography>
                <div className='flex gap-2'>
                  <Typography color='text.disabled' className='line-through'>$5.00</Typography>
                  <Chip size='small' variant='filled' color='success' label='Free'/>
                </div>
              </div>
            </div>
          </CardContent>
          <Divider/>
          <CardContent className='flex items-center justify-between flex-wrap'>
            <Typography className='font-medium' color='text.primary'>Total</Typography>
            <Typography className='font-medium' color='text.primary'>${order.total_price}</Typography>
          </CardContent>
        </div>
        <div className='flex justify-end'>
          <Button className='is-full sm:is-auto lg:is-full' variant='contained' onClick={handleNext}>
            Place Order
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default StepAddress;
