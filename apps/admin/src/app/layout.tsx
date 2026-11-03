import type { Metadata } from 'next'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'

import { AppProviders } from '@/modules/app/AppProviders'

import './globals.css'

const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin'],
  weight: ['700', '800'],
})

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: { default: 'Bora · Espace salle', template: '%s · Bora pour les salles' },
  description: 'Suivez la rétention de vos nouveaux inscrits et gérez vos machines.',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr" className={`${bricolageGrotesque.variable} ${figtree.variable} h-full antialiased`}>
      <body className="font-text text-body flex min-h-full flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
