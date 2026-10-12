import { MapPin, Pencil } from 'lucide-react'
import type { Application } from '../types/application'
import CompanyBadge from './CompanyBadge'
import StageBadge from './StageBadge'
import { formatDate } from '../utils/dates'

type ApplicationListProps = {
  applications: Application[]
  onEdit: (application: Application) => void
}

function ApplicationList({ applications, onEdit }: ApplicationListProps) {
  return (
    <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-sm">
      {applications.map((app) => (
        <li key={app.id} className="flex items-center gap-4 p-4">
          <CompanyBadge name={app.company} />

          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-slate-900">{app.role}</p>
            <p className="truncate text-sm text-slate-500">{app.company}</p>
          </div>

          <p className="hidden items-center gap-1 text-sm text-slate-500 md:flex">
            <MapPin className="h-4 w-4" />
            {app.location}
          </p>

          <p className="hidden text-sm text-slate-500 sm:block">
            {formatDate(app.dateApplied)}
          </p>

          <StageBadge stage={app.stage} />

          <button
            onClick={() => onEdit(app)}
            aria-label={`Edit ${app.company}`}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ApplicationList