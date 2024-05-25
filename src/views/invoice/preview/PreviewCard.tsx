'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// Type Imports
import {InvoiceType} from "src/@core/types/invoice/invoiceTypes";

// Component Imports
import Logo from "src/@core/svg/Logo";

// Config Imports
import themeConfig from "src/configs/themeConfig";

// Style Imports
import {User} from "src/@core/interface/user/interface";
import {Order} from "src/@core/interface/order/interface";
import {Language} from "src/@core/interface/language/interface";
import { TableHead } from '@mui/material'
import { Table } from '@mui/material'
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

interface Props {
  userProfile: User;
  order: Order;
  languages: Language[];
}

const PreviewCard = ({ userProfile, order, languages }: Props) => {
  const config = themeConfig();
  const invoiceData = {
    issuedDate: "2023-11-01",
    dueDate: "2023-11-15",
    name: order.customer.first_name,
    company: "Some Company",
    address: order.address,
    contact: order.customer.phone,
    companyEmail: order.customer.email,
  };

  const data = order.products.map((product, index) => ({
    Item: product.product.translate_content.find(content => content.lang_code === 'ru')?.content.name,
    Description: product.product.translate_content.find(content => content.lang_code === 'ru')?.content.description,
    Hours: "N/A",
    Qty: product.quantity,
    Total: (product.purchase_price * product.quantity).toString()
  }));

  return (
    <Card>
      <CardContent style={{
        borderColor: 'var(--mui-palette-customColors-inputBorder)',
        borderWidth: '1px',
        borderStyle: 'solid',
        backgroundColor: 'var(--mui-palette-background-paper)'
      }} className='sm:!p-12, border rounded'>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div style={{
              borderColor: 'var(--mui-palette-customColors-inputBorder)',
              borderWidth: '1px',
              borderStyle: 'solid',
              backgroundColor: 'var(--mui-palette-background-paper)',
              padding: 30,
            }} className='border rounded'>
              <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
                <div className='flex flex-col gap-6'>
                  <div className='flex items-center gap-2.5'>
                    <Logo className='text-primary' height={25} width={30}/>
                    <Typography
                      className='uppercase font-semibold text-xl leading-tight tracking-[0.15px]'
                      color='text.primary'
                    >
                      {config.templateName}
                    </Typography>
                  </div>
                  <div>
                    <Typography color='text.primary'>Office 149, 450 South Brand Brooklyn</Typography>
                    <Typography color='text.primary'>San Diego County, CA 91905, USA</Typography>
                    <Typography color='text.primary'>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
                  </div>
                </div>
                <div className='flex flex-col gap-6'>
                  <Typography variant='h6'>Invoice</Typography>
                  <div className='flex flex-col gap-1'>
                    <Typography color='text.primary'>##{order.id}</Typography>
                    <Typography color='text.primary'>{`Date Issued: ${invoiceData.issuedDate}`}</Typography>
                    <Typography color='text.primary'>{`Date Due: ${invoiceData.dueDate}`}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <div style={{
                  borderStyle: 'solid',
                  padding: 30,
                }} className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Invoice To:
                  </Typography>
                  <div>
                    <Typography>First Name: {invoiceData.name}</Typography>
                    <Typography>Last Name: {invoiceData.name}</Typography>
                    <Typography>Address: {invoiceData.address}</Typography>
                    <Typography>Mobile: {invoiceData.contact}</Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{
                  borderStyle: 'solid',
                  padding: 30,
                }} className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Bill To:
                  </Typography>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Total Due:</Typography>
                      <Typography>$12,110.55</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Bank name:</Typography>
                      <Typography>American Bank</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Country:</Typography>
                      <Typography>United States</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>IBAN:</Typography>
                      <Typography>ETD95476213874685</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                      <Typography>BR91905</Typography>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{
              borderColor: 'var(--mui-palette-customColors-inputBorder)',
              borderWidth: '1px',
              borderStyle: 'solid',
              backgroundColor: 'var(--mui-palette-background-paper)',
              padding: 30,
            }} className='overflow-x-auto border rounded'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Hours</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.Item}</TableCell>
                      <TableCell>{item.Description}</TableCell>
                      <TableCell>{item.Hours}</TableCell>
                      <TableCell>{item.Qty}</TableCell>
                      <TableCell>{item.Total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{
              borderStyle: 'solid',
              padding: 30,
            }} className='flex justify-between flex-col gap-y-4 sm:flex-row'>
              <div className='flex flex-col gap-1 order-2 sm:order-[unset]'>
                <div className='flex items-center gap-2'>
                  <Typography className='font-medium' color='text.primary'>
                    Salesperson:
                  </Typography>
                  <Typography>Valentin Krivich</Typography>
                </div>
                <Typography>Thanks for your business</Typography>
              </div>
              <div className='min-is-[200px]'>
                <div className='flex items-center justify-between'>
                  <Typography>Subtotal:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    $1800
                  </Typography>
                </div>
                <div className='flex items-center justify-between'>
                  <Typography>Discount:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    $28
                  </Typography>
                </div>
                <div className='flex items-center justify-between'>
                  <Typography>Tax:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    21%
                  </Typography>
                </div>
                <Divider className='mlb-2' />
                <div className='flex items-center justify-between'>
                  <Typography>Total:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    $1690
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Divider className='border-dashed' />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Typography component='span' className='font-medium' color='text.primary'>
                Note:
              </Typography>{' '}
              It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PreviewCard;
