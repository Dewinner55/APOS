// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import OrderListTable from './OrderListTable'
import OrderListCards from './cards/OrderListCards'

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";

interface Props {
  userProfile: User
  languages: Language[];
}

const OrderList = (props: Props) => {
  const {userProfile, languages} = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <OrderListCards/>
      </Grid>
      <Grid item xs={12}>
        <OrderListTable
          userProfile={userProfile}
          languages={languages}
        />
      </Grid>
    </Grid>
  )
}

export default OrderList
