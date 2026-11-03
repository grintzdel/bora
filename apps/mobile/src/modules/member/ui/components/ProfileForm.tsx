import { Spacing } from '@bora/design-tokens'
import { StyleSheet, View } from 'react-native'

import type { Level } from '../../../shared/core/domain/constants/level.constant'
import { CheckboxRow } from '../../../shared/ui/components/CheckboxRow'
import { ChoiceGroup } from '../../../shared/ui/components/ChoiceGroup'
import type { Availability } from '../../core/domain/constants/availability.constant'
import type { Goal } from '../../core/domain/constants/goal.constant'
import type { Profile } from '../../core/domain/member.domain-model'
import { AvailabilityChoiceLabel, GoalChoiceLabel, LevelChoiceLabel } from '../format/profile-labels'

const toOptions = <Value extends string>(labels: Record<Value, string>) =>
  (Object.keys(labels) as Value[]).map((value) => ({ value, label: labels[value] }))

type ProfileFormProps = {
  readonly profile: Profile
  readonly onLevelChange: (level: Level) => void
  readonly onGoalChange: (goal: Goal) => void
  readonly onAvailabilityToggle: (availability: Availability) => void
  readonly onSameGenderToggle: () => void
}

export const ProfileForm = ({
  profile,
  onLevelChange,
  onGoalChange,
  onAvailabilityToggle,
  onSameGenderToggle,
}: ProfileFormProps) => (
  <View style={styles.form}>
    <ChoiceGroup
      label="Ton niveau"
      options={toOptions(LevelChoiceLabel)}
      isSelected={(level) => profile.level === level}
      onSelect={onLevelChange}
    />
    <ChoiceGroup
      label="Ton objectif"
      options={toOptions(GoalChoiceLabel)}
      isSelected={(goal) => profile.goal === goal}
      onSelect={onGoalChange}
    />
    <ChoiceGroup
      label="Quand tu peux venir"
      options={toOptions(AvailabilityChoiceLabel)}
      isSelected={(availability) => profile.availability.includes(availability)}
      onSelect={onAvailabilityToggle}
    />
    <CheckboxRow
      label="Un duo du même genre que moi"
      description="Tu peux changer ça à tout moment."
      checked={profile.sameGenderDuo}
      onToggle={onSameGenderToggle}
    />
  </View>
)

const styles = StyleSheet.create({
  form: { gap: Spacing[6] },
})
