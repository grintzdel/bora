import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { formatPercent } from '../../../shared/ui/format/format-number'
import { selectWelcomeKit } from '../../core/store/invitation.selectors'
import { fetchWelcomeKitThunk } from '../../core/store/invitation.thunks'

type CopyStatus = 'idle' | 'copied' | 'failed'

const COPY_FEEDBACK_MS = 2500

export const useWelcomeKit = () => {
  const dispatch = useAppDispatch()
  const { data: kit } = useAppSelector(selectWelcomeKit)
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')

  useEffect(() => {
    void dispatch(fetchWelcomeKitThunk())
  }, [dispatch])

  return {
    kit: kit
      ? {
          gymName: kit.gymName,
          inviteUrl: kit.inviteUrl,
          opened: String(kit.openedThisMonth),
          openedCaption: `pour ${kit.newMembersThisMonth} nouveaux inscrits`,
          activated: String(kit.activatedThisMonth),
          activatedCaption: `${formatPercent(
            kit.newMembersThisMonth === 0 ? 0 : kit.activatedThisMonth / kit.newMembersThisMonth
          )} des nouveaux inscrits`,
        }
      : null,
    copyFeedback:
      copyStatus === 'copied'
        ? 'Lien copié'
        : copyStatus === 'failed'
          ? 'Copie impossible, sélectionnez le lien'
          : null,
    copyLink: async () => {
      if (!kit) return
      try {
        await navigator.clipboard.writeText(kit.inviteUrl)
        setCopyStatus('copied')
      } catch {
        setCopyStatus('failed')
      }
      setTimeout(() => setCopyStatus('idle'), COPY_FEEDBACK_MS)
    },
  }
}
