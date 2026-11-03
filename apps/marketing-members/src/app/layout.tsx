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
  title: 'Bora',
  description: 'Un duo de ta salle et un programme guidé à faire ensemble.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr" className={`${bricolageGrotesque.variable} ${figtree.variable} h-full antialiased`}>
      <body className="font-text text-body flex min-h-full flex-col">{children}</body>
    </html>
  )
}
