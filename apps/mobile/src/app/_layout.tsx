import { ColorScheme } from '@bora/design-tokens'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

import { useBoraFonts } from '@/modules/shared/ui/hooks/use-bora-fonts'
import { useTheme } from '@/modules/shared/ui/hooks/use-theme'

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { ready } = useBoraFonts()
  const { scheme, colors } = useTheme()

  useEffect(() => {
    if (ready) void SplashScreen.hideAsync()
  }, [ready])

  if (!ready) return null

  return (
    <>
      <StatusBar style={scheme === ColorScheme.DARK ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.surface100 } }} />
    </>
  )
}
