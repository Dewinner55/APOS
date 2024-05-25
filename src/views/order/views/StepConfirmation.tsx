// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {User} from "src/@core/interface/user/interface";
import {Order} from "src/@core/interface/order/interface";
import {Language} from "src/@core/interface/language/interface";

interface StepConfirmationProps {
  userProfile: User;
  order: Order;
  languages: Language[];
}

const StepConfirmation = ({ userProfile, order, languages }: StepConfirmationProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='flex items-center flex-col text-center gap-4'>
          <Typography variant='h4'>Ордер создан! 😇</Typography>
          <Typography>
            Номер ордера <span className='font-medium text-textPrimary'>#{order.id}</span>
          </Typography>
          <div>
            <Typography>
              Мы отправили электронное письмо на адрес <span className='font-medium text-textPrimary'>{order.customer.email}</span> с указанием получение заказа.
            </Typography>
            <Typography>
              Если письмо не пришло в течение двух минут, проверьте папку со спамом и проверьте, было ли письмо отправлено.
              направлен туда.
            </Typography>
          </div>
          <div className='flex items-center gap-2'>
            <i className='ri-time-line text-xl' />
            <Typography>Время размещения: 25/05/2020 13:35pm</Typography>
          </div>
        </div>
      </Grid>
      {/*<Grid item xs={12} md={3} xl={3}>*/}
      {/*  <div className='flex flex-col md:flex-row border rounded' style={{*/}
      {/*    borderColor: 'var(--mui-palette-customColors-inputBorder)',*/}
      {/*    borderWidth: '1px',*/}
      {/*    borderStyle: 'solid',*/}
      {/*    backgroundColor: 'var(--mui-palette-background-paper)'*/}
      {/*  }}>*/}
      {/*    <div*/}
      {/*      className='flex flex-col is-full p-5 gap-4 items-cente:last-child)]:border-be-0 md:[&:not(:last-child)]:border-ie'>*/}
      {/*      <div className='flex items-center gap-2'>*/}
      {/*        <i className='ri-map-pin-line text-xl text-textPrimary'/>*/}
      {/*        <Typography className='font-medium' color='text.primary'>*/}
      {/*          Shipping*/}
      {/*        </Typography>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <Typography>{order.customer.first_name} {order.customer.display_name}</Typography>*/}
      {/*        <Typography>{order.address}</Typography>*/}
      {/*      </div>*/}
      {/*      <Typography className='font-medium'>{order.customer.phone}</Typography>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12} md={6} xl={6}>*/}
      {/*  <div className='border rounded'>*/}
      {/*    {order.products.map((product, index) => {*/}
      {/*      const productContent = product.product.translate_content.find(*/}
      {/*        (content) => content.lang_code === 'ru'*/}
      {/*      );*/}

      {/*      return (*/}
      {/*        <div key={index} className='flex flex-col sm:flex-row items-center [&:not(:last-child)]:border-be pl-4'>*/}
      {/*          <img height={80} width={80} src={product.product.product_info.info_0.images[0]}*/}
      {/*               alt={productContent?.content.name}/>*/}
      {/*          <div className='flex justify-between is-full p-5 flex-col sm:flex-row items-center sm:items-start'>*/}
      {/*            <div className='flex flex-col gap-2 items-center sm:items-start'>*/}
      {/*              <Typography className='font-medium' color='text.primary'>*/}
      {/*                {productContent?.content.name}*/}
      {/*              </Typography>*/}
      {/*              <div className='flex items-center gap-1'>*/}
      {/*                <Typography>Sold By:</Typography>*/}
      {/*                <Typography component='span' className='font-medium text-textPrimary'>*/}
      {/*                  {product.product.brand.translate_content.find((content) => content.lang_code === 'ru')?.content.name}*/}
      {/*                </Typography>*/}
      {/*              </div>*/}
      {/*              {product.product.available &&*/}
      {/*                <Chip variant='filled' size='small' color='success' label='In Stock'/>}*/}
      {/*            </div>*/}
      {/*            <div className='flex items-center'>*/}
      {/*              <Typography color='primary'>{`$${product.product.price}`}</Typography>*/}
      {/*              {product.product.product_discount > 0 && (*/}
      {/*                <Typography color='text.disabled' className='line-through'>*/}
      {/*                  {`/$${(product.product.price * (1 + product.product.product_discount / 100)).toFixed(2)}`}*/}
      {/*                </Typography>*/}
      {/*              )}*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12} md={3} xl={3}>*/}
      {/*<div className='border rounded'>*/}
      {/*    <CardContent className='flex gap-4 flex-col'>*/}
      {/*      <Typography className='font-medium' color='text.primary'>*/}
      {/*        Price Details*/}
      {/*      </Typography>*/}
      {/*      <div className='flex flex-col gap-4'>*/}
      {/*        <div className='flex items-center justify-between gap-2'>*/}
      {/*          <Typography color='text.primary'>Order Total</Typography>*/}
      {/*          <Typography>{`$${order.total_price}`}</Typography>*/}
      {/*        </div>*/}
      {/*        <div className='flex items-center justify-between gap-2'>*/}
      {/*          <Typography color='text.primary'>Delivery Charges</Typography>*/}
      {/*          <div className='flex gap-2'>*/}
      {/*            <Typography className='line-through' color='text.disabled'>*/}
      {/*              $5.00*/}
      {/*            </Typography>*/}
      {/*            <Chip variant='filled' size='small' color='success' label='Free' />*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </CardContent>*/}
      {/*    <Divider />*/}
      {/*    <CardContent>*/}
      {/*      <div className='flex items-center justify-between gap-2'>*/}
      {/*        <Typography className='font-medium' color='text.primary'>*/}
      {/*          Total*/}
      {/*        </Typography>*/}
      {/*        <Typography className='font-medium' color='text.primary'>*/}
      {/*          {`$${order.total_price}`}*/}
      {/*        </Typography>*/}
      {/*      </div>*/}
      {/*    </CardContent>*/}
      {/*  </div>*/}
      {/*</Grid>*/}
    </Grid>
  );
};

export default StepConfirmation;
