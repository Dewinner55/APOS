// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import BrandsListTable from './BrandsListTable'
import BrandsListCards from './cards/BrandsListCards'

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";

interface Props {
  userProfile: User
  languages: Language[];
}

const BrandsList = (props: Props) => {
  const {userProfile, languages} = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <BrandsListCards/>
      </Grid>
      <Grid item xs={12}>
        <BrandsListTable
          userProfile={userProfile}
          languages={languages}
        />
      </Grid>
    </Grid>
  )
}

export default BrandsList
