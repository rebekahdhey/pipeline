import { CalendarCheck, Send, TrendingUp, Trophy } from 'lucide-react'
import type { Application, Stage } from '../types/application'
import { computeStats } from '../utils/stats'
import Board from './Board'
import StatCard from './StatCard'

type DashboardProps = {
  applications: Application[]
  onMove: (id: string, stage: Stage) => void
  onEdit: (application: Application) => void
}

function Dashboard({ applications, onMove, onEdit }: DashboardProps) {
  const stats = computeStats(applications)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total applications"
          value={stats.total}
          hint="Everything you've sent so far"
          icon={Send}
          iconStyle="bg-slate-100 text-slate-600"
        />
        <StatCard
          label="Interviews"
          value={stats.interviews}
          hint="Currently in the interview stage"
          icon={CalendarCheck}
          iconStyle="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          label="Offers"
          value={stats.offers}
          hint="Waiting on your decision"
          icon={Trophy}
          iconStyle="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Response rate"
          value={`${stats.responseRate}%`}
          hint="Applications that heard back"
          icon={TrendingUp}
          iconStyle="bg-amber-50 text-amber-600"
        />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Pipeline</h2>
        <Board applications={applications} onMove={onMove} onEdit={onEdit} />
      </div>
    </div>
  )
}

export default Dashboard