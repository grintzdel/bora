import type { Metadata } from 'next'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'

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
  title: {
    default: 'Bora pour les salles — Vos nouveaux viennent à deux',
    template: '%s · Bora pour les salles',
  },
  description:
    'Bora met chaque nouvel inscrit en duo avec un débutant de votre salle, leur donne un programme guidé, et vous montre combien restent grâce à eux.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="fr"
      data-theme="light"
      className={`${bricolageGrotesque.variable} ${figtree.variable} h-full scroll-smooth antialiased`}
    >
      <body className="font-text text-body bg-surface-100 text-ink flex min-h-full flex-col">
        <a
          href="#contenu"
          className="focus:rounded-pill focus:bg-lime focus:text-on-lime sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  )
}
