export const businessConfig = {
  membersSiteUrl: process.env.NEXT_PUBLIC_MEMBERS_URL ?? 'http://localhost:3000',
  adminSiteUrl: process.env.NEXT_PUBLIC_ADMIN_URL ?? 'http://localhost:3001',
  contactEmail: 'bonjour@bora.app',
} as const
