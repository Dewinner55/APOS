// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserDataType } from 'src/@core/components/card-statistics/HorizontalWithSubtitle'

// Component Imports
import HorizontalWithSubtitle from 'src/@core/components/card-statistics/HorizontalWithSubtitle'

// Vars
const data: UserDataType[] = [
  {
    title: 'Session',
    value: '21,459',
    avatarIcon: 'ri-group-line',
    avatarColor: 'primary',
    change: 'positive',
    changeNumber: '29%',
    subTitle: 'Total User'
  },
  {
    title: 'Paid Users',
    value: '4,567',
    avatarIcon: 'ri-user-add-line',
    avatarColor: 'error',
    change: 'positive',
    changeNumber: '18%',
    subTitle: 'Last week analytics'
  },
  {
    title: 'Active Users',
    value: '19,860',
    avatarIcon: 'ri-user-follow-line',
    avatarColor: 'success',
    change: 'negative',
    changeNumber: '14%',
    subTitle: 'Last week analytics'
  },
  {
    title: 'Pending Users',
    value: '237',
    avatarIcon: 'ri-user-search-line',
    avatarColor: 'warning',
    change: 'positive',
    changeNumber: '42%',
    subTitle: 'Last week analytics'
  }
]

const BrandsListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default BrandsListCards
