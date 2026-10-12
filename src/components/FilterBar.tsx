import { RotateCcw } from 'lucide-react'
import { stageConfig, stageOrder } from '../data/stages'
import { hasActiveFilters } from '../utils/filtering'
import type { Filters, ModeFilter, SortKey, StageFilter } from '../utils/filtering'

type FilterBarProps = {
  filters: Filters
  onChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  onReset: () => void
  resultCount: number
  totalCount: number
}

const stageOptions: StageFilter[] = ['all', ...stageOrder]

const modeOptions: { value: ModeFilter; label: string }[] = [
  { value: 'all', label: 'All work modes' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'On-site', label: 'On-site' },
]

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'company', label: 'Company A–Z' },
  { value: 'stage', label: 'By stage' },
]

const selectClass =
  'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'

function FilterBar({ filters, onChange, onReset, resultCount, totalCount }: FilterBarProps) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {stageOptions.map((stage) => {
          const isActive = filters.stage === stage
          return (
            <button
              key={stage}
              onClick={() => onChange('stage', stage)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {stage === 'all' ? 'All' : stageConfig[stage].label}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.workMode}
          onChange={(e) => onChange('workMode', e.target.value as ModeFilter)}
          aria-label="Filter by work mode"
          className={selectClass}
        >
          {modeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => onChange('sort', e.target.value as SortKey)}
          aria-label="Sort applications"
          className={selectClass}
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {hasActiveFilters(filters) && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        )}

        <p className="ml-auto text-sm text-slate-500">
          Showing {resultCount} of {totalCount}
        </p>
      </div>
    </div>
  )
}

export default FilterBar