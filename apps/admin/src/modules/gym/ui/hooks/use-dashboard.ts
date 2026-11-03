import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AppRoute } from '../../../shared/ui/app-route.constant'
import { formatEuros, formatPercent } from '../../../shared/ui/format/format-number'
import { formatSlot, formatWeekday } from '../../../shared/ui/format/format-slot'
import { AvailabilityLabel } from '../../../shared/ui/format/profile-labels'
import { LONG_WAIT_DAYS } from '../../core/domain/dashboard-indicators.domain-model'
import type { Dashboard } from '../../core/domain/dashboard.domain-model'
import { selectDashboard } from '../../core/store/gym.selectors'
import { fetchDashboardThunk } from '../../core/store/gym.thunks'
import type { DashboardAlert } from '../components/WatchList'
import {
  AvailabilityInSentence,
  capitalize,
  cohortLabel,
  countInWords,
  monthName,
  plural,
  StaffingHint,
} from '../format/dashboard-labels'

const toTiles = ({ tiles }: Dashboard) => [
  { label: 'Nouveaux inscrits ce mois', value: String(tiles.newMembers) },
  {
    label: 'Ont activé Bora',
    value: String(tiles.activated),
    caption: `${formatPercent(tiles.newMembers === 0 ? 0 : tiles.activated / tiles.newMembers)} des nouveaux`,
  },
  {
    label: "Duo trouvé en moins d'une semaine",
    value: formatPercent(tiles.quickDuo.eligible === 0 ? 0 : tiles.quickDuo.found / tiles.quickDuo.eligible),
    caption: `${tiles.quickDuo.found} ${plural(tiles.quickDuo.found, 'nouveau', 'nouveaux')} sur ${tiles.quickDuo.eligible}`,
  },
  { label: 'Séances faites à deux', value: String(tiles.duoSessions) },
]

const toRetention = ({ retention }: Dashboard) => ({
  subtitle: cohortLabel(retention.cohortMonth, retention.measuredMonth),
  rows: (['day30', 'day60', 'day90'] as const).map((horizon) => ({
    horizon: `Après ${horizon.slice(3)} jours`,
    duo: retention.duo[horizon],
    solo: retention.solo[horizon],
  })),
  summary: `${retention.extraMembersKept} ${plural(retention.extraMembersKept, 'adhérent gardé', 'adhérents gardés')} de plus qu'en restant seuls, soit ${formatEuros(retention.monthlyRevenueCents)} d'abonnement par mois.`,
})

const toSlots = ({ slots }: Dashboard) => {
  const top = slots[0]
  return {
    rows: slots.map((slot) => ({
      label: AvailabilityLabel[slot.availability],
      percent: Math.round(slot.share * 100),
      display: formatPercent(slot.share),
    })),
    hint: top && top.share > 0 ? StaffingHint[top.availability] : null,
  }
}

const toAlerts = ({ alerts }: Dashboard): ReadonlyArray<DashboardAlert> => {
  const { waiting, fragileDuos, reports } = alerts
  const waitingAlert: ReadonlyArray<DashboardAlert> =
    waiting.count > 0
      ? [
          {
            id: 'waiting',
            tag: 'Sans duo',
            tone: 'warning',
            text: `${waiting.count} ${plural(waiting.count, 'nouveau attend', 'nouveaux attendent')} un duo depuis plus de ${LONG_WAIT_DAYS} jours${
              waiting.commonAvailability
                ? `, ${waiting.count > 1 ? 'tous ' : ''}${AvailabilityInSentence[waiting.commonAvailability]}`
                : ''
            }.`,
            action: { label: 'Voir les membres', href: AppRoute.MEMBERS },
          },
        ]
      : []
  const fragileAlerts: ReadonlyArray<DashboardAlert> = fragileDuos.map((duo) => ({
    id: `fragile-${duo.names.join('-')}`,
    tag: 'Duo fragile',
    tone: 'warning',
    text: `${duo.names[0]} et ${duo.names[1]} ont annulé leurs ${countInWords(duo.cancelledInARow)} dernières séances.`,
    action: { label: 'Voir le duo', href: AppRoute.MEMBERS },
  }))
  const reportAlert: ReadonlyArray<DashboardAlert> =
    reports.count > 0
      ? [
          {
            id: 'reports',
            tag: 'Signalement',
            tone: 'brand',
            text: `${reports.count} ${plural(reports.count, 'signalement')} à traiter, ${
              reports.count > 1 ? 'le dernier reçu' : 'reçu'
            } ${reports.lastReceivedWeekday ? formatWeekday(reports.lastReceivedWeekday) : 'récemment'}. Bora vous accompagne.`,
            action: { label: 'Ouvrir', href: AppRoute.WELCOME_AND_REPORTS },
          },
        ]
      : []
  return [...waitingAlert, ...fragileAlerts, ...reportAlert]
}

const toActiveDuos = ({ activeDuos }: Dashboard) =>
  activeDuos.map((duo) => ({
    id: duo.id,
    names: `${duo.firstNames[0]} et ${duo.firstNames[1]}`,
    slot: formatSlot(duo.slot),
    sessions: `${duo.sessionsDone} ${plural(duo.sessionsDone, 'séance')} à deux`,
  }))

export const useDashboard = () => {
  const dispatch = useAppDispatch()
  const { data, isLoading, error } = useAppSelector(selectDashboard)

  useEffect(() => {
    void dispatch(fetchDashboardThunk())
  }, [dispatch])

  return {
    isLoading: isLoading && data === null,
    error: error && data === null ? "Le tableau de bord n'a pas pu se charger." : null,
    retry: () => void dispatch(fetchDashboardThunk()),
    view: data
      ? {
          title: `${capitalize(monthName(data.month))}, vos nouveaux tiennent bon`,
          tiles: toTiles(data),
          retention: toRetention(data),
          slots: toSlots(data),
          alerts: toAlerts(data),
          activeDuos: toActiveDuos(data),
        }
      : null,
  }
}
