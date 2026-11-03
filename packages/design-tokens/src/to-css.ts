import { Colors, type ColorScheme, Radius, Shadow, Size, SPACING_UNIT, Typography } from './tokens.ts'

const kebab = (name: string) => name.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase()

const px = (value: number) => `${value}px`

const declarations = (entries: ReadonlyArray<readonly [string, string]>, indent: string) =>
  entries.map(([name, value]) => `${indent}${name}: ${value};`).join('\n')

const schemeVariables = (scheme: ColorScheme) => [
  ...Object.entries(Colors[scheme]).map(([name, value]) => [`--color-${kebab(name)}`, value] as const),
  ...Object.entries(Shadow[scheme]).map(([name, value]) => [`--shadow-${kebab(name)}`, value] as const),
]

const typographyVariables = Object.entries(Typography).flatMap(([name, style]) => {
  const key = `--text-${kebab(name)}`
  return [
    [key, px(style.fontSize)],
    [`${key}--line-height`, px(style.lineHeight)],
    [`${key}--letter-spacing`, px(style.letterSpacing)],
    [`${key}--font-weight`, String(style.fontWeight)],
  ] as const
})

export const toCss = () => {
  const theme = [
    ['--color-*', 'initial'],
    ...schemeVariables('light'),
    ['--spacing', px(SPACING_UNIT)],
    ...Object.entries(Radius).map(([name, value]) => [`--radius-${kebab(name)}`, px(value)] as const),
    ...Object.entries(Size).map(([name, value]) => [`--spacing-${kebab(name)}`, px(value)] as const),
    ...typographyVariables,
  ] as const
  const dark = schemeVariables('dark')

  return `/* Generated from src/tokens.ts by \`pnpm --filter @bora/design-tokens build\`. Do not edit. */

@theme {
${declarations(theme, '  ')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
${declarations(dark, '    ')}
  }
}

:root[data-theme='dark'] {
${declarations(dark, '  ')}
}
`
}
