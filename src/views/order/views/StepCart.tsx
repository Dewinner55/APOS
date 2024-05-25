// React Imports
import {useState, useEffect} from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Rating from '@mui/material/Rating'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import {User} from "src/@core/interface/user/interface";
import {Order} from "src/@core/interface/order/interface";
import {Language} from "src/@core/interface/language/interface";

// Component Imports
import TableFilters from '../list/filter/TableFilters'

interface StepCartProps {
  handleNext: () => void;
  userProfile: User;
  order: Order;
  languages: Language[];
}

const StepCart = ({handleNext, userProfile, order, languages}: StepCartProps) => {
  // States
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);
  const [openFade, setOpenFade] = useState<boolean>(true);
  const [selectedLang, setSelectedLang] = useState<string>('en'); // language state

  useEffect(() => {
    if (!openFade) {
      setTimeout(() => {
        setOpenCollapse(false);
      }, 300);
    }
  }, [openFade]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
  }

  const {products} = order;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8} className="flex flex-col gap-4">
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
        <div className="flex justify-between items-center">
          <Typography className="rounded" variant="h6">
            My Shopping Bag ({products.length} {products.length === 1 ? 'Item' : 'Items'})
          </Typography>
          <div style={{marginLeft: 'auto'}}>
            <TableFilters selectedLang={selectedLang} onLanguageChange={handleLanguageChange} languages={languages}/>
          </div>
        </div>
        <div style={{
          borderColor: 'var(--mui-palette-customColors-inputBorder)',
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: 'var(--mui-palette-background-paper)'
        }} className='border rounded'>
          {products.map((orderProduct, index) => {
            const {product, quantity, purchase_price} = orderProduct;
            const productImage = product.product_info.info_0.images[0];
            const productName = product.translate_content.find(t => t.lang_code === selectedLang)?.content.name || product.translate_content[0].content.name;
            const productDescription = product.translate_content.find(t => t.lang_code === selectedLang)?.content.description || product.translate_content[0].content.description;
            const inStock = product.available;

            return (
              <div key={index}
                   className="flex flex-col sm:flex-row items-center relative p-5 gap-4 [&:not(:last-child)]:border-b">
                <img height={140} width={140} src={productImage} alt={productName}/>
                <IconButton size="small" className="absolute block-start-2 inline-end-2">
                  <i className="ri-close-line text-lg"/>
                </IconButton>
                <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full">
                  <div className="flex flex-col gap-2 items-center sm:items-start">
                    <Typography className="font-medium" color="text.primary">
                      {productName}
                    </Typography>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Typography color="text.disabled">Sold By:</Typography>
                        <Link href="/" passHref>
                          <Typography component="a" color="primary" onClick={(e) => e.preventDefault()}>
                            {product.brand.translate_content.find(t => t.lang_code === selectedLang)?.content.name || product.brand.translate_content[0].content.name}
                          </Typography>
                        </Link>
                      </div>
                      {inStock ? (
                        <Chip size="small" variant="filled" color="success" label="In Stock"/>
                      ) : (
                        <Chip size="small" variant="filled" color="error" label="Out of Stock"/>
                      )}
                    </div>
                    {/* I'm adding a mock rating for now, replace with the actual rating if you have it */}
                    <Rating name="google-nest-rating" value={4} readOnly/>
                    <TextField size="small" type="number" defaultValue={quantity} className="w-full max-w-[100px]"/>
                  </div>
                  <div className="flex flex-col justify-between items-center mt-4 gap-1 sm:items-end">
                    <div className="flex">
                      <Typography color="primary">
                        {`$${purchase_price}`}
                      </Typography>
                      <span className="text-textSecondary">/</span>
                      <Typography className="line-through">{`$${product.price}`}</Typography>
                    </div>
                    <Button variant="outlined" size="small">Move to wishlist</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Grid>
      <Grid item xs={12} lg={4} className="flex flex-col gap-2">
        <div style={{
          borderColor: 'var(--mui-palette-customColors-inputBorder)',
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: 'var(--mui-palette-background-paper)'
        }} className='border rounded'>
          <CardContent className="flex flex-col gap-4">
            <Typography className="font-medium" color="text.primary">
              Offer
            </Typography>
            <div className="flex gap-4">
              <Typography className="font-medium" color="text.primary">
                Номер промокода: false
              </Typography>
            </div>
            <div className="flex gap-4">
              <Typography className="font-medium" color="text.primary">
                Промокод активирован: false
              </Typography>
            </div>
            <Typography className="font-medium" color="text.primary">
              Подарок: false
            </Typography>
            <Typography className="font-medium" color="text.primary">
              Оплата: онлайн
            </Typography>
            <Typography className="font-medium" color="text.primary">
              Доставка: самовывоз
            </Typography>
          </CardContent>
          <Divider/>
          <CardContent className="flex flex-col gap-4">
            <Typography className="font-medium" color="text.primary">
              Price Details
            </Typography>
            <div className="flex flex-col gap-2">
              <div className="flex items-center flex-wrap justify-between">
                <Typography color="text.primary">Bag Total</Typography>
                <Typography>${order.total_price}</Typography>
              </div>
              <div className="flex items-center flex-wrap justify-between">
                <Typography color="text.primary">Общая скидка</Typography>
                  <Typography component="a" onClick={(e) => e.preventDefault()} color="primary">
                    {`$${products.length > 0 ? products[0].product.product_discount : 0}`}
                  </Typography>
              </div>
              <div className="flex items-center flex-wrap justify-between">
                <Typography color="text.primary">Скидка с промокода</Typography>
                  <Typography component="a" onClick={(e) => e.preventDefault()} color="primary">
                    false
                  </Typography>
              </div>
              <div className="flex items-center flex-wrap justify-between">
                <Typography color="text.primary">Order Total</Typography>
                <Typography>${order.total_price}</Typography>
              </div>
              <div className="flex items-center flex-wrap justify-between">
                <Typography color="text.primary">Delivery Charges</Typography>
                <div className="flex items-center gap-2">
                  <Typography color="text.disabled" className="line-through">
                    $5.00
                  </Typography>
                  <Chip variant="filled" size="small" color="success" label="Free"/>
                </div>
              </div>
            </div>
          </CardContent>
          <Divider/>
          <CardContent>
            <div className="flex items-center flex-wrap justify-between">
              <Typography className="font-medium" color="text.primary">
                Total
              </Typography>
              <Typography className="font-medium" color="text.primary">
                ${order.total_price}
              </Typography>
            </div>
          </CardContent>
        </div>
        <div className="flex justify-normal sm:justify-end xl:justify-normal">
          <Button fullWidth variant="contained" onClick={handleNext}>
            Place Order
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default StepCart;
