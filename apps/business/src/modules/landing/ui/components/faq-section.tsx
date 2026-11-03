import { faqs } from '@/modules/landing/core/domain/content'

import { Container } from './container'
import { ChevronIcon } from './icons'

export function FaqSection() {
  return (
    <section id="faq" className="bg-surface-100 scroll-mt-8 pb-20 md:pb-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-section text-ink mb-8">Vos questions</h2>
          <ul className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <li key={faq.question}>
                <details className="group bg-surface-000 rounded-md px-5 py-4" open={index === 0}>
                  <summary className="text-headline text-ink flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronIcon className="faq-chevron size-icon-sm text-ink-subtle shrink-0 transition-transform" />
                  </summary>
                  <p className="text-body text-ink-muted mt-3 max-w-xl pr-8">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
