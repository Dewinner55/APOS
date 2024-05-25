// MUI Imports
import MuiTabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import type { TabListProps } from '@mui/lab/TabList'

export type CustomTabListProps = TabListProps & {
  pill?: 'true' | 'false'
}

const TabList = styled(MuiTabList)<CustomTabListProps>(({ theme, pill, orientation }) => ({
  ...(pill === 'true' && {
    minHeight: 38,
    ...(orientation === 'vertical'
      ? {
          borderInlineEnd: 0
        }
      : {
          borderBlockEnd: 0
        }),
    '&, & .MuiTabs-scroller': {
      ...(orientation === 'vertical' && {
        boxSizing: 'content-box'
      }),
      margin: `${theme.spacing(-1, -1, -1.5, -1)} !important`,
      padding: theme.spacing(1, 1, 1.5, 1)
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .MuiTabs-flexContainer': {
      gap: theme.spacing(1)
    },
    '& .Mui-selected': {
      backgroundColor: 'var(--mui-palette-primary-main) !important',
      color: 'var(--mui-palette-primary-contrastText) !important',
      boxShadow: 'var(--mui-customShadows-xs)'
    },
    '& .MuiTab-root': {
      minHeight: 38,
      padding: theme.spacing(2, 5.5),
      borderRadius: 'var(--mui-shape-borderRadius)',
      '&:hover': {
        border: 0,
        backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
        ...(orientation === 'vertical'
          ? {
              paddingInlineEnd: theme.spacing(5.5)
            }
          : {
              paddingBlockEnd: theme.spacing(2)
            })
      }
    }
  })
}))

const CustomTabList = (props: CustomTabListProps) => <TabList {...props} />

export default CustomTabList
