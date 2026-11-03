import type { ReactNode } from 'react'

export const SectionTitle = ({ children, id }: { readonly children: ReactNode; readonly id?: string }) => (
  <h2 id={id} className="font-display text-title-2 m-0">
    {children}
  </h2>
)
