// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import SubcategoryListTable from './SubcategoryListTable'
import SubcategoryListCards from './cards/SubcategoryListCards'

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Language} from "src/@core/interface/language/interface";

interface Props {
  userProfile: User
  languages: Language[];
}

const SubcategoryList = (props: Props) => {
  const {userProfile, languages} = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubcategoryListCards/>
      </Grid>
      <Grid item xs={12}>
        <SubcategoryListTable
          userProfile={userProfile}
          languages={languages}
        />
      </Grid>
    </Grid>
  )
}

export default SubcategoryList
