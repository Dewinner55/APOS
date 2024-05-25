// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import PromocodeListTable from './PromocodeListTable'
import CategoryListCards from './cards/CategoryListCards'

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";

interface Props {
  userProfile: User
  languages: Language[];
}

const CategoryList = (props: Props) => {
  const {userProfile, languages} = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CategoryListCards/>
      </Grid>
      <Grid item xs={12}>
        <PromocodeListTable
          userProfile={userProfile}
          languages={languages}
        />
      </Grid>
    </Grid>
  )
}

export default CategoryList
