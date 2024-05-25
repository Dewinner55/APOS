// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProductsListTable from './ProductsListTable'
import ProductsListCards from './cards/ProductsListCards'

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";

interface Props {
  userProfile: User
  languages: Language[];
}

const ProductsList = (props: Props) => {
  const {userProfile, languages} = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductsListCards/>
      </Grid>
      <Grid item xs={12}>
        <ProductsListTable
          userProfile={userProfile}
          languages={languages}
        />
      </Grid>
    </Grid>
  )
}

export default ProductsList
