export const AppRoute = {
  SIGN_IN: '/',
  DASHBOARD: '/tableau-de-bord',
  MEMBERS: '/membres',
  MACHINES: '/machines',
  MACHINE_QR_SHEET: '/machines/qr-codes',
  WELCOME_AND_REPORTS: '/accueil-et-signalements',
  WELCOME_POSTER: '/accueil-et-signalements/affiche',
} as const

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute]
