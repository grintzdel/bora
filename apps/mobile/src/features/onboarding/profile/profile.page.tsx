import { Spacing } from '@bora/design-tokens'
import { useRouter } from 'expo-router'

import { ProfileForm } from '@/modules/member/ui/components/ProfileForm'
import { useEditProfile } from '@/modules/member/ui/hooks/use-edit-profile'
import { AppText } from '@/modules/shared/ui/components/AppText'
import { BottomBar } from '@/modules/shared/ui/components/BottomBar'
import { Button } from '@/modules/shared/ui/components/Button'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { ScreenTitle } from '@/modules/shared/ui/components/ScreenTitle'
import { StepHeader } from '@/modules/shared/ui/components/StepHeader'

export const ProfilePage = () => {
  const router = useRouter()
  const profile = useEditProfile()

  const handleContinue = async () => {
    if (await profile.save()) router.push('/onboarding/duo')
  }

  return (
    <Screen
      gap={Spacing[6]}
      footer={
        <BottomBar>
          <Button
            label="Trouver mon duo"
            size="lg"
            block
            icon="arrow"
            disabled={!profile.canSave || profile.isSaving}
            onPress={() => void handleContinue()}
          />
        </BottomBar>
      }
    >
      <StepHeader onBack={() => router.back()} progress={0.5} stepLabel="1 sur 2" />
      <ScreenTitle
        title="Dis-nous où tu en es"
        subtitle="Pas de photo. Ton duo est choisi sur ton niveau et tes créneaux."
      />
      {profile.profile ? (
        <ProfileForm
          profile={profile.profile}
          onLevelChange={profile.selectLevel}
          onGoalChange={profile.selectGoal}
          onAvailabilityToggle={profile.toggleAvailability}
          onSameGenderToggle={profile.toggleSameGenderDuo}
        />
      ) : null}
      {profile.missingSlotHint ? (
        <AppText variant="caption" color="inkMuted">
          {profile.missingSlotHint}
        </AppText>
      ) : null}
    </Screen>
  )
}
