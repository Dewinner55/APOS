// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CategoryDetails from './CategoryDetails'

// Interface Imports
import {User} from "src/@core/interface/user/interface";
import {Category} from "src/@core/interface/category/interface";
import {Language} from "src/@core/interface/language/interface";

type Props = {
  userProfile: User;
  category: Category;
  languages: Language[];
};

const CategoryLeftOverview = ({ userProfile, category, languages }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CategoryDetails
          userProfile={userProfile}
          category={category}
          languages={languages}
        />
      </Grid>
    </Grid>
  )
}

export default CategoryLeftOverview
