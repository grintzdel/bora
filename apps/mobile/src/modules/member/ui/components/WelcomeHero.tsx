import { Colors, Radius, Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import { AppText } from '../../../shared/ui/components/AppText'
import { useTheme } from '../../../shared/ui/hooks/use-theme'

type WelcomeHeroProps = {
  readonly tags: ReadonlyArray<string>
}

export const WelcomeHero = ({ tags }: WelcomeHeroProps) => {
  const { colors } = useTheme()

  return (
    <View aria-hidden style={[styles.hero, { backgroundColor: colors.surfaceInverse }]}>
      <View style={[styles.lime, { backgroundColor: colors.lime }]} />
      <View style={[styles.lilac, { backgroundColor: Colors.dark.brand }]} />
      <View style={styles.tags}>
        {tags.map((tag) => (
          <View key={tag} style={[styles.tag, { backgroundColor: colors.inkInverse }]}>
            <AppText variant="label" color="onLime">
              {tag}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: { height: 300, borderRadius: Radius.lg, overflow: 'hidden' },
  lime: { position: 'absolute', left: 54, top: 62, width: 176, height: 176, borderRadius: Radius.pill },
  lilac: { position: 'absolute', left: 168, top: 92, width: 148, height: 148, borderRadius: Radius.pill },
  tags: { position: 'absolute', left: Spacing[6], bottom: Spacing[5], flexDirection: 'row', gap: Spacing[2] },
  tag: { paddingVertical: 6, paddingHorizontal: Spacing[3], borderRadius: Radius.pill },
})
