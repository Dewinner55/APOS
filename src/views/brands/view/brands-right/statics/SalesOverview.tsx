'use client'

// Next Imports

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionsMenu from '@core/components/option-menu'
import { Hidden } from '@mui/material'

// Styled Component Imports
const CardWidgetsSalesOverview = () => {

  return (
    <Card>
      <CardHeader
        title='Sales Overview'
        action={<OptionsMenu iconClassName='text-textPrimary' options={['Last 28 Days', 'Last Month', 'Last Year']}/>}
      />
      <CardContent>
        {/* Блок с информацией о продажах */}
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm={6} className='mbe-4'>
            <div className='flex items-center gap-3'>
              <CustomAvatar skin='light' color='primary' variant='rounded'>
                <i className='ri-wallet-line text-primary'/>
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography>Number of Sales</Typography>
                <Typography variant='h5'>$86,400</Typography>
              </div>
            </div>
          </Grid>
          {/* Блок с категориями продаж */}
          <Hidden xsDown>
            <Grid item sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div className='flex items-center gap-2 mbe-1'>
                    <div>
                      <i className='ri-circle-fill text-[10px] text-primary'/>
                    </div>
                    <Typography>Apparel</Typography>
                  </div>
                  <Typography className='font-medium'>$12,150</Typography>
                </Grid>
                <Grid item xs={6}>
                  <div className='flex items-center gap-2 mbe-1'>
                    <div>
                      <i className='ri-circle-fill text-[10px] text-primary'/>
                    </div>
                    <Typography>Electronics</Typography>
                  </div>
                  <Typography className='font-medium'>$24,900</Typography>
                </Grid>
                <Grid item xs={6}>
                  <div className='flex items-center gap-2 mbe-1'>
                    <div>
                      <i className='ri-circle-fill text-[10px] text-primary'/>
                    </div>
                    <Typography>FMCG</Typography>
                  </div>
                  <Typography className='font-medium'>$12,750</Typography>
                </Grid>
                <Grid item xs={6}>
                  <div className='flex items-center gap-2 mbe-1'>
                    <div>
                      <i className='ri-circle-fill text-[10px] text-primary'/>
                    </div>
                    <Typography>Other Sales</Typography>
                  </div>
                  <Typography className='font-medium'>$50,200</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardWidgetsSalesOverview
