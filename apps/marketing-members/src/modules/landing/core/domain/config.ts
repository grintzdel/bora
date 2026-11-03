export const marketingConfig = {
  businessSiteUrl: process.env.NEXT_PUBLIC_BUSINESS_URL ?? 'http://localhost:3002',
  adminSiteUrl: process.env.NEXT_PUBLIC_ADMIN_URL ?? 'http://localhost:3001',
  contactEmail: 'bonjour@bora.app',
} as const
