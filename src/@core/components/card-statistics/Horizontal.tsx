'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { CardStatsHorizontalProps } from 'src/@core/types/pages/widgetTypes'

// Components Imports
import CustomAvatar from 'src/@core/components/mui/Avatar'

// Hooks Imports
import { useSettings } from 'src/@core/hooks/useSettings'

const CardStatHorizontal = (props: CardStatsHorizontalProps) => {
  // Props
  const { title, stats, icon, color, trendNumber, trend } = props

  // Hooks
  const { settings } = useSettings()

  return (
    <Card className='bg-transparent border rounded shadow-none'>
      <CardContent className='flex items-center gap-4'>
        <CustomAvatar
          variant='rounded'
          skin='light'
          color={color}
          className={classnames('bg-backgroundPaper', {
            'shadow-none border rounded': settings.skin === 'bordered',
            'shadow-xs': settings.skin === 'none' || settings.skin === 'bordered'
          })}
        >
          <i className={icon} />
        </CustomAvatar>
        <div>
          <Typography>{title}</Typography>
          <div className='flex items-center'>
            <Typography variant='h5'>{stats}</Typography>
            <div className='flex items-center'>
              <i
                className={classnames(
                  trend === 'up' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line',
                  trend === 'up' ? 'text-success' : 'text-error'
                )}
              ></i>
              <Typography color={trend === 'up' ? 'success.main' : 'error.main'}>{trendNumber}</Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStatHorizontal
