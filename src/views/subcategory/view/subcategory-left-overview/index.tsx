// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import SubcategoryDetails from './SubcategoryDetails'

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Subcategory} from "src/@core/interface/subcategory/interface";
import {Language} from "src/@core/interface/language/interface";

type Props = {
  userProfile: User;
  subcategory: Subcategory;
  languages: Language[];
};

const SubcategoryLeftOverview = ({ userProfile, subcategory, languages }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubcategoryDetails
          userProfile={userProfile}
          subcategory={subcategory}
          languages={languages}
        />
      </Grid>
    </Grid>
  )
}

export default SubcategoryLeftOverview
