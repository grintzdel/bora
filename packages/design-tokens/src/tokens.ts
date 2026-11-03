export const ColorScheme = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type ColorScheme = (typeof ColorScheme)[keyof typeof ColorScheme]

const lightColors = {
  surface000: '#fbf8ff',
  surface100: '#f4f0fc',
  surface200: '#eee8fb',
  surfaceInverse: '#2a1e4a',
  ink: '#2a1e4a',
  inkMuted: '#5b5175',
  inkSubtle: '#6e6489',
  inkInverse: '#f4f0fc',
  line: '#d9d0f2',
  lineStrong: '#8e80b8',
  brand: '#6b3fd6',
  onBrand: '#ffffff',
  brandSoft: '#e4dafb',
  lime: '#c8f169',
  onLime: '#2a1e4a',
  focus: '#6b3fd6',
  success: '#3e6a12',
  successSurface: '#e7f9be',
  warning: '#8a5a00',
  warningSurface: '#fdf0cf',
  danger: '#b3261e',
  onDanger: '#ffffff',
  dangerSurface: '#fce6e3',
  scrim: 'rgba(42, 30, 74, 0.48)',
} as const

export type ColorName = keyof typeof lightColors

export const Colors = {
  light: lightColors,
  dark: {
    surface000: '#3a2c63',
    surface100: '#2a1e4a',
    surface200: '#231a40',
    surfaceInverse: '#5a3fb0',
    ink: '#f4f0fc',
    inkMuted: '#d9d0f2',
    inkSubtle: '#a99ccb',
    inkInverse: '#f4f0fc',
    line: '#4a3b78',
    lineStrong: '#8a7cbf',
    brand: '#b79cff',
    onBrand: '#2a1e4a',
    brandSoft: '#4a3b78',
    lime: '#c8f169',
    onLime: '#2a1e4a',
    focus: '#b79cff',
    success: '#c8f169',
    successSurface: '#33402a',
    warning: '#f5c451',
    warningSurface: '#46391f',
    danger: '#ff9a8b',
    onDanger: '#2a1e4a',
    dangerSurface: '#4a2338',
    scrim: 'rgba(10, 6, 22, 0.64)',
  },
} as const satisfies Record<ColorScheme, Record<ColorName, string>>

export const FontFamily = {
  display: 'Bricolage Grotesque',
  text: 'Figtree',
} as const

export type FontFamily = keyof typeof FontFamily

type TextStyle = {
  readonly family: FontFamily
  readonly fontSize: number
  readonly lineHeight: number
  readonly fontWeight: 400 | 500 | 600 | 700 | 800
  readonly letterSpacing: number
}

export const Typography = {
  number: { family: 'display', fontSize: 48, lineHeight: 48, fontWeight: 800, letterSpacing: -1.5 },
  display: { family: 'display', fontSize: 36, lineHeight: 40, fontWeight: 800, letterSpacing: -1 },
  title1: { family: 'display', fontSize: 28, lineHeight: 32, fontWeight: 800, letterSpacing: -0.5 },
  title2: { family: 'display', fontSize: 22, lineHeight: 28, fontWeight: 700, letterSpacing: -0.2 },
  headline: { family: 'text', fontSize: 17, lineHeight: 22, fontWeight: 700, letterSpacing: 0 },
  body: { family: 'text', fontSize: 16, lineHeight: 24, fontWeight: 400, letterSpacing: 0 },
  bodyStrong: { family: 'text', fontSize: 16, lineHeight: 24, fontWeight: 600, letterSpacing: 0 },
  button: { family: 'text', fontSize: 16, lineHeight: 20, fontWeight: 700, letterSpacing: 0 },
  caption: { family: 'text', fontSize: 13, lineHeight: 18, fontWeight: 500, letterSpacing: 0 },
  label: { family: 'text', fontSize: 13, lineHeight: 16, fontWeight: 700, letterSpacing: 0.2 },
} as const satisfies Record<string, TextStyle>

export type TypographyName = keyof typeof Typography

export const SPACING_UNIT = 4

export const Spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
} as const

export const Radius = {
  sm: 12,
  md: 20,
  lg: 28,
  pill: 999,
} as const

export const Size = {
  tapMin: 48,
  buttonLg: 56,
  iconMd: 24,
  iconSm: 20,
} as const

export const Shadow = {
  light: { float: '0 -8px 24px rgba(42, 30, 74, 0.12)' },
  dark: { float: '0 -8px 24px rgba(0, 0, 0, 0.4)' },
} as const satisfies Record<ColorScheme, Record<string, string>>
