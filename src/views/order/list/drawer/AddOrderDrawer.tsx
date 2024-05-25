// React Imports
import {useState} from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import {axiosClassic} from "src/api/interseptor";
import {CircularProgress} from "@mui/material";

// Filters Imports

// Styled Components Imports
import {
  StyledButton,
  StyledButtonContainer,
  StyledDiv,
  StyledDrawer,
  StyledForm,
  StyledSnackbar,
  StyledTypography
} from "src/views/order/styles/styles";

// Types Imports

// Interface Imports
import {useTranslations} from "next-intl";
import {OrderCreate} from "src/@core/interface/order/interface";

type Props = {
  open: boolean;
  handleClose: () => void;
  fetchData: (page: number, pageSize: number) => Promise<void>;
  page: number;
  pageSize: number;
  showSuccessMessage: (message: string) => void;
};

const AddOrderDrawer = ({ open, handleClose, fetchData, page, pageSize, showSuccessMessage }: Props) => {
  const t = useTranslations('categoryList');

  const [orderData, setOrderData] = useState<OrderCreate>({
    promocodes: [],
    data: {
      address: '',
      customer: { _id: '', email: '', first_name: '', display_name: '', phone: '' },
      products: [{ quantity: 0, product_id: '', product_info_idx: '' }]
    }
  });

  const [showEmptyFieldsMessage, setShowEmptyFieldsMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setOrderData({
      ...orderData,
      data: {
        ...orderData.data,
        [name]: value
      }
    });
  };

  const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setOrderData({
      ...orderData,
      data: {
        ...orderData.data,
        customer: {
          ...orderData.data.customer,
          [name]: value
        }
      }
    });
  };

  const handleProductChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const products = [...orderData.data.products];
    products[index] = { ...products[index], [name]: value };
    setOrderData({
      ...orderData,
      data: {
        ...orderData.data,
        products: products
      }
    });
  };

  const addProduct = () => {
    setOrderData(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        products: [...prevState.data.products, { quantity: 0, product_id: '', product_info_idx: '' }]
      }
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Валидация формы
    if (!orderData.data.address || !orderData.data.customer.email || !orderData.data.customer.first_name || !orderData.data.customer.display_name || !orderData.data.customer.phone) {
      setShowEmptyFieldsMessage(true);

      return;
    }

    setLoading(true);
    let createdSuccess = false;
    try {
      await axiosClassic.post('/order-admin', orderData);
      createdSuccess = true;
    } catch (error) {
      console.error(t('errorCreated'), error);

    } finally {
      setLoading(false);
      if (createdSuccess) {
        showSuccessMessage(t("successCreated"));
        await fetchData(page, pageSize);
        handleClose();
      }
    }
  };

  const handleReset = () => {
    setOrderData({
      promocodes: [],
      data: {
        address: '',
        customer: { _id: '', email: '', first_name: '', display_name: '', phone: '' },
        products: [{ quantity: 0, product_id: '', product_info_idx: '' }]
      }
    });
    handleClose();
  };

  return (
    <StyledDrawer open={open} anchor='right' variant='temporary' onClose={handleReset}
                  ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <StyledDiv>
        <StyledTypography variant='h5'>{t("addNewCategory")}</StyledTypography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line' />
        </IconButton>
      </StyledDiv>
      <Divider />
      <StyledButtonContainer className='p-5'>
        <StyledForm onSubmit={handleSubmit}>
          <TextField label={t('Address')} name='address' fullWidth value={orderData.data.address} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
          <TextField label={t('Customer Email')} name='email' fullWidth value={orderData.data.customer.email} onChange={handleCustomerChange} sx={{ marginBottom: 2 }} />
          <TextField label={t('Customer First Name')} name='first_name' fullWidth value={orderData.data.customer.first_name} onChange={handleCustomerChange} sx={{ marginBottom: 2 }} />
          <TextField label={t('Customer Display Name')} name='display_name' fullWidth value={orderData.data.customer.display_name} onChange={handleCustomerChange} sx={{ marginBottom: 2 }} />
          <TextField label={t('Customer Phone')} name='phone' fullWidth value={orderData.data.customer.phone} onChange={handleCustomerChange} sx={{ marginBottom: 2 }} />

          {orderData.data.products.map((product, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <TextField
                label={t('Product ID')}
                name='product_id'
                fullWidth
                value={product.product_id}
                onChange={e => handleProductChange(index, e)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label={t('Product Info Index')}
                name='product_info_idx'
                fullWidth
                value={product.product_info_idx}
                onChange={e => handleProductChange(index, e)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label={t('Quantity')}
                name='quantity'
                type='number'
                fullWidth
                value={product.quantity}
                onChange={e => handleProductChange(index, e)}
                sx={{ marginBottom: 2 }}
              />
            </div>
          ))}
          <Button variant='outlined' onClick={addProduct} sx={{ marginBottom: 2 }}>Add Product</Button>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <StyledButton variant='contained' type='submit'>
              {t('Create')}
            </StyledButton>
            <StyledButton variant='outlined' color='error' type='reset' onClick={handleReset}>
              {t('Cancel')}
            </StyledButton>
            {loading && <CircularProgress />}
          </div>
        </StyledForm>
      </StyledButtonContainer>
    </StyledDrawer>
  );
};

export default AddOrderDrawer;
