// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import BrandsDetails from './BrandsDetails'

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Brands} from "src/@core/interface/brands/interface";
import {Language} from "src/@core/interface/language/interface";

type Props = {
  userProfile: User;
  brand: Brands;
  languages: Language[];
};

const BrandsLeftOverview = ({ userProfile, brand, languages }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <BrandsDetails
          userProfile={userProfile}
          brand={brand}
          languages={languages}
        />
      </Grid>
    </Grid>
  )
}

export default BrandsLeftOverview
