type StatTileProps = {
  readonly label: string
  readonly value: string
  readonly caption?: string
}

export const StatTile = ({ label, value, caption }: StatTileProps) => (
  <div className="bg-surface-000 flex flex-1 basis-[200px] flex-col gap-2 rounded-md p-4 sm:p-5">
    <span className="text-caption text-ink-muted">{label}</span>
    <span className="font-display sm:text-number text-[40px] leading-10 font-extrabold tracking-[-1px]">{value}</span>
    {caption ? <span className="text-caption text-ink-muted">{caption}</span> : null}
  </div>
)
