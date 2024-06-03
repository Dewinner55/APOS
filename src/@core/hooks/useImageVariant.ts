// React Imports
import { useMemo } from 'react'

// Third-party imports


// Type imports
import type { Mode } from '@core/types'

// Hook Imports
import { useSettings } from './useSettings'

export const useImageVariant = (
  mode: Mode,
  imgLight: string,
  imgDark: string,
  imgLightBordered?: string,
  imgDarkBordered?: string
): string => {
  // Hooks
  const { settings } = useSettings()


  return useMemo(() => {
    const isServer = typeof window === 'undefined'

    const currentMode = (() => {
      if (isServer) return mode

    })()

    const isBordered = settings?.skin === 'bordered'
    const isDarkMode = currentMode === 'dark'

    if (isBordered && imgLightBordered && imgDarkBordered) {
      return isDarkMode ? imgDarkBordered : imgLightBordered
    }

    return isDarkMode ? imgDark : imgLight
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])
}
