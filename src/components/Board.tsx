import type { Application, Stage } from '../types/application'
import { stageOrder } from '../data/stages'
import KanbanColumn from './KanbanColumn'

type BoardProps = {
  applications: Application[]
  onMove: (id: string, stage: Stage) => void
  onEdit: (application: Application) => void
}

function Board({ applications, onMove, onEdit }: BoardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stageOrder.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          applications={applications.filter((a) => a.stage === stage)}
          onMove={onMove}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default Board