type CompanyBadgeProps = {
  name: string
}

const palettes = [
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
]

function pickPalette(name: string): string {
  let hash = 0
  for (const char of name) {
    hash += char.charCodeAt(0)
  }
  return palettes[hash % palettes.length]
}

function CompanyBadge({ name }: CompanyBadgeProps) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${pickPalette(name)}`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

export default CompanyBadge