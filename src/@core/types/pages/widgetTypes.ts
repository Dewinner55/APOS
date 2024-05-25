// Type Imports
import type { ThemeColor } from '@core/types'
import type { OptionsMenuType } from '@core/components/option-menu/types'
import type { CustomAvatarProps } from '@core/components/mui/Avatar'

export type CardStatsHorizontalProps = {
  title: string
  stats: string
  icon: string
  color?: ThemeColor
  trendNumber: string
  trend?: string
}

export type CardStatsVerticalProps = {
  title: string
  stats: string
  avatarIcon: string
  subtitle: string
  avatarColor?: ThemeColor
  trendNumber: string
  trend?: 'positive' | 'negative'
  avatarSkin?: CustomAvatarProps['skin']
  avatarSize?: number
  moreOptions?: OptionsMenuType
}

export type CardStatsCharacterProps = {
  src: string
  title: string
  stats: string
  chipText: string
  trendNumber: string
  chipColor?: ThemeColor
  trend?: 'positive' | 'negative'
}

export type CardStatsType = {
  statsVertical: CardStatsVerticalProps[]
  statsCharacter: CardStatsCharacterProps[]
  statsHorizontal: CardStatsHorizontalProps[]
}
