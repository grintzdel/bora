import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const IconPath = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  alert: 'M12 8v5M12 16.5v.01M10.3 3.9L2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  info: 'M12 11v5M12 7.5v.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
  x: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 9l6 6M15 9l-6 6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  back: 'M19 12H5M11 6l-6 6 6 6',
  close: 'M6 6l12 12M18 6L6 18',
  home: 'M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z',
  calendar: 'M6 5h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zM3 10h18M8 3v4M16 3v4',
  users:
    'M9 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM17 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM2 20c1-3.5 4-5 7-5s6 1.5 7 5M15 15.5c2.5-.5 5.5.5 7 3.5',
  bookmark: 'M6 4h12v16l-6-4-6 4z',
  qr: 'M4 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM15 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM4 14h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1zM14 14h3v3M21 14v.01M17 21h4v-4M14 21v-3',
  play: 'M8 5l11 7-11 7z',
} as const

export type IconName = keyof typeof IconPath

type IconProps = {
  readonly name: IconName
  readonly color: string
  readonly size?: number
  readonly strokeWidth?: number
}

export const Icon = ({ name, color, size = 20, strokeWidth = 2 }: IconProps) => (
  <View aria-hidden>
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d={IconPath[name]} />
    </Svg>
  </View>
)
