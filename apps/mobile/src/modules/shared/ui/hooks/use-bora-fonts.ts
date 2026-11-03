import { BricolageGrotesque_700Bold } from '@expo-google-fonts/bricolage-grotesque/700Bold'
import { BricolageGrotesque_800ExtraBold } from '@expo-google-fonts/bricolage-grotesque/800ExtraBold'
import { Figtree_400Regular } from '@expo-google-fonts/figtree/400Regular'
import { Figtree_500Medium } from '@expo-google-fonts/figtree/500Medium'
import { Figtree_600SemiBold } from '@expo-google-fonts/figtree/600SemiBold'
import { Figtree_700Bold } from '@expo-google-fonts/figtree/700Bold'
import { useFonts } from 'expo-font'

import { FontFile } from '../theme/text-styles'

export const useBoraFonts = () => {
  const [loaded, error] = useFonts({
    [FontFile.display700]: BricolageGrotesque_700Bold,
    [FontFile.display800]: BricolageGrotesque_800ExtraBold,
    [FontFile.text400]: Figtree_400Regular,
    [FontFile.text500]: Figtree_500Medium,
    [FontFile.text600]: Figtree_600SemiBold,
    [FontFile.text700]: Figtree_700Bold,
  })

  return { ready: loaded || error !== null }
}
