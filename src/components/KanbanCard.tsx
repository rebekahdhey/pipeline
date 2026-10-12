import { Banknote, Clock, MapPin } from 'lucide-react'
import type { Application, Stage } from '../types/application'
import { stageConfig, stageOrder } from '../data/stages'
import { daysSince } from '../utils/dates'
import CompanyBadge from './CompanyBadge'

type KanbanCardProps = {
  application: Application
  onMove: (id: string, stage: Stage) => void
  onEdit: (application: Application) => void
}

function KanbanCard({ application, onMove, onEdit }: KanbanCardProps) {
  const days = daysSince(application.dateApplied)

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start gap-3">
        <CompanyBadge name={application.company} />
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900">{application.role}</h3>
          <p className="truncate text-sm text-slate-500">{application.company}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {application.workMode}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {days === 0 ? 'Today' : `${days}d ago`}
        </span>
        {application.salary && (
          <span className="flex items-center gap-1">
            <Banknote className="h-3.5 w-3.5" />
            {application.salary}
          </span>
        )}
      </div>

      <select
        value={application.stage}
        onChange={(e) => onMove(application.id, e.target.value as Stage)}
        aria-label={`Move ${application.company} to another stage`}
        className="mt-4 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        {stageOrder.map((stage) => (
          <option key={stage} value={stage}>
            {stageConfig[stage].label}
          </option>
        ))}
      </select>
    </article>
  )
}

export default KanbanCard