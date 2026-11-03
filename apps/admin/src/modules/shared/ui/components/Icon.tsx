const IconPaths = {
  chart: ['M4 20V10', 'M10 20V4', 'M16 20v-7', 'M22 20H2'],
  users: ['M9 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M17 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M2 20c1-3.5 4-5 7-5s6 1.5 7 5'],
  machines: [
    'M4 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
    'M15 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
    'M4 14h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z',
    'M14 14h3v3',
    'M21 21h-4',
  ],
  flag: ['M5 21V4h11l-2 4 2 4H5'],
  door: ['M4 21h16', 'M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17', 'M14 12h.01'],
  arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
  check: ['M5 12l5 5L20 7'],
  alert: [
    'M12 8v5',
    'M12 16.5v.5',
    'M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
  ],
  info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6', 'M12 7.5v.5'],
  x: ['M6 6l12 12', 'M18 6 6 18'],
  plus: ['M12 5v14', 'M5 12h14'],
  printer: [
    'M6 9V3h12v6',
    'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2',
    'M6 14h12v7H6z',
  ],
  copy: ['M9 9h11v11H9z', 'M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1'],
  pencil: ['M4 20h4L19 9l-4-4L4 16v4Z', 'M13.5 6.5l4 4'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h10'],
  search: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M20 20l-4-4'],
  logout: ['M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4', 'M10 17l5-5-5-5', 'M15 12H3'],
  pause: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M10 9v6', 'M14 9v6'],
} as const

export type IconName = keyof typeof IconPaths

type IconProps = {
  readonly name: IconName
  readonly size?: number
  readonly className?: string
}

export const Icon = ({ name, size = 20, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`shrink-0 ${className ?? ''}`}
  >
    {IconPaths[name].map((path) => (
      <path key={path} d={path} />
    ))}
  </svg>
)
