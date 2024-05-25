// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import {InvoiceType} from "src/@core/types/invoice/invoiceTypes";

// Component Imports
import PreviewActions from './PreviewActions'
import PreviewCard from './PreviewCard'
import {User} from "src/@core/interface/user/interface";
import {Order} from "src/@core/interface/order/interface";
import {Language} from "src/@core/interface/language/interface";

interface Props {
  userProfile: User;
  order: Order;
  languages: Language[];
}

const Preview = ({ userProfile, order, languages }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        <PreviewCard
          userProfile={userProfile}
          order={order}
          languages={languages}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <PreviewActions
          userProfile={userProfile}
          order={order}
          languages={languages}
        />
      </Grid>
    </Grid>
  )
}

export default Preview
