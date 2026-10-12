import type { Stage } from '../types/application'
import { stageConfig } from '../data/stages'

type StageBadgeProps = {
  stage: Stage
}

function StageBadge({ stage }: StageBadgeProps) {
  const config = stageConfig[stage]

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}

export default StageBadge