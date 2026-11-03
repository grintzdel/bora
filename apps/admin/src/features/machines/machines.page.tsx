'use client'

import { GuidedProgramCard } from '@/modules/machine/ui/components/GuidedProgramCard'
import { MachineCard } from '@/modules/machine/ui/components/MachineCard'
import { MachineEditor } from '@/modules/machine/ui/components/MachineEditor'
import { useMachineForm } from '@/modules/machine/ui/hooks/use-machine-form'
import { useMachines } from '@/modules/machine/ui/hooks/use-machines'
import { Banner } from '@/modules/shared/ui/components/Banner'
import { Button } from '@/modules/shared/ui/components/Button'
import { PageHeader } from '@/modules/shared/ui/components/PageHeader'
import { SectionTitle } from '@/modules/shared/ui/components/SectionTitle'

export const MachinesPage = () => {
  const machines = useMachines()
  const form = useMachineForm({ target: machines.editing, zoneNames: machines.zoneNames, onSaved: machines.showSaved })

  return (
    <>
      <PageHeader
        title="Machines et QR codes"
        subtitle="Un QR code par machine : vos nouveaux le scannent et voient le tuto et les réglages."
        actions={
          <>
            <Button variant="secondary" iconStart="printer" onClick={machines.printAll}>
              Imprimer tous les QR codes
            </Button>
            <Button iconEnd="plus" onClick={machines.add}>
              Ajouter une machine
            </Button>
          </>
        }
      />

      {machines.toEquip ? (
        <Banner tone="warning" title={machines.toEquip.title}>
          {machines.toEquip.details}
        </Banner>
      ) : null}

      {machines.isLoading ? <p className="text-body text-ink-muted m-0">Chargement des machines…</p> : null}
      {machines.loadError ? (
        <div className="flex flex-col items-start gap-3">
          <Banner tone="danger" title={machines.loadError} />
          <Button variant="secondary" onClick={machines.retry}>
            Réessayer
          </Button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[3_1_520px] flex-col gap-8">
          {machines.zones.map((zone) => (
            <section key={zone.name} aria-labelledby={`zone-${zone.name}`} className="flex flex-col gap-3">
              <SectionTitle id={`zone-${zone.name}`}>{zone.title}</SectionTitle>
              <ul className="m-0 flex list-none flex-wrap gap-4 p-0">
                {zone.machines.map((machine) => (
                  <MachineCard
                    key={machine.id}
                    name={machine.name}
                    caption={machine.caption}
                    tag={machine.tag}
                    actionLabel={machine.action.label}
                    isEditing={machine.isEditing}
                    onAction={() =>
                      machine.action.kind === 'print' ? machines.printOne(machine.id) : machines.edit(machine.id)
                    }
                  />
                ))}
              </ul>
            </section>
          ))}

          {machines.programs.length > 0 ? (
            <section aria-labelledby="programmes" className="flex flex-col gap-3">
              <SectionTitle id="programmes">Programmes guidés</SectionTitle>
              <p className="text-body text-ink-muted m-0">Les séances que vos duos suivent, machine par machine.</p>
              <ul className="m-0 flex list-none flex-wrap gap-4 p-0">
                {machines.programs.map((program) => (
                  <GuidedProgramCard
                    key={program.id}
                    name={program.name}
                    level={program.level}
                    summary={program.summary}
                    exercises={program.exercises}
                  />
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {form.isOpen ? (
          <MachineEditor
            key={machines.editing?.key}
            title={form.title}
            isNew={form.isNew}
            draft={form.draft}
            errors={form.errors}
            formError={form.formError}
            savedMessage={form.savedMessage}
            isSaving={form.isSaving}
            zoneNames={form.zoneNames}
            usages={form.usages}
            qr={form.qr}
            preview={form.preview}
            onNameChange={form.setName}
            onNumberChange={form.setNumber}
            onZoneChange={form.setZone}
            onStepChange={form.setStep}
            onAddStep={form.addStep}
            onRemoveStep={form.removeStep}
            onQrInstalledChange={form.setQrInstalled}
            onSubmit={() => void form.submit()}
            onPrintQr={() => (form.qr ? machines.printOne(form.qr.id) : undefined)}
            onClose={machines.closeEditor}
          />
        ) : null}
      </div>
    </>
  )
}
