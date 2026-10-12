import type { LucideIcon } from 'lucide-react'

type StatsCardProps = {
  label: string
  value: string | number
  hint: string
  icon: LucideIcon
  iconStyle: string
}

function StatCard({ label, value, hint, icon: Icon, iconStyle}: StatsCardProps) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm font-medium text-slate-500'>{label}</p>
          <p className='mt-2 text-3xl font-semibold text-slate-900'>{value}</p>
        </div>
        <div className={`flex h-1- w-10 items-center justify-center rounded-lg ${iconStyle}`}>
          <Icon className='h-5 w-5'/>
        </div>
      </div>
      <p className='mt-3 text-xs text-slate-400'>{hint}</p>
    </div>
  )
}

export default StatCard