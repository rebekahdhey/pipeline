import type { Application, Stage } from '../types/application'
import { stageConfig } from '../data/stages'
import KanbanCard from './KanbanCard'

type KanbanColumnProps = {
  stage: Stage
  applications: Application[]
  onMove: (id: string, stage: Stage) => void
  onEdit: (application: Application) => void
}

function KanbanColumn({ stage, applications, onMove, onEdit }: KanbanColumnProps) {
  const config = stageConfig[stage]

  return (
    <section className="flex flex-col rounded-xl bg-slate-100/70 p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${config.dot}`} />
          <h2 className="text-sm font-semibold text-slate-700">{config.label}</h2>
        </div>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500">
          {applications.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {applications.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400">
            Nothing here yet
          </p>
        ) : (
          applications.map((app) => (
            <KanbanCard key={app.id} application={app} onMove={onMove} onEdit={onEdit} />
          ))
        )}
      </div>
    </section>
  )
}

export default KanbanColumn