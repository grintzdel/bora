import { ProgramCard } from '@/modules/session/ui/components/ProgramCard'
import { usePrograms } from '@/modules/session/ui/hooks/use-programs'
import { Screen } from '@/modules/shared/ui/components/Screen'
import { ScreenTitle } from '@/modules/shared/ui/components/ScreenTitle'

export const ProgramsPage = () => {
  const { programs } = usePrograms()

  return (
    <Screen>
      <ScreenTitle title="Tes programmes" subtitle="Pensés pour débuter, à faire à deux." />
      {programs.map((program) => (
        <ProgramCard key={program.id} name={program.name} summary={program.summary} exercises={program.exercises} />
      ))}
    </Screen>
  )
}
