import { Download, RotateCcw, Trash2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type SettingsProps = {
  applicationCount: number
  onExport: () => void
  onResetSample: () => void
  onClearAll: () => void
}

type RowProps = {
  title: string
  description: string
  buttonLabel: string
  icon: LucideIcon
  onClick: () => void
  disabled?: boolean
  danger?: boolean
}

function Row({ title, description, buttonLabel, icon: Icon, onClick, disabled, danger }: RowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-slate-100 py-5 first:border-t-0 first:pt-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
          danger
            ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
        }`}
      >
        <Icon className="h-4 w-4" />
        {buttonLabel}
      </button>
    </div>
  )
}

function Settings({ applicationCount, onExport, onResetSample, onClearAll }: SettingsProps) {
  return (
    <div className="max-w-2xl space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">Your data</h2>
        <p className="mt-1 mb-6 text-sm text-slate-500">
          Pipeline saves your {applicationCount}{' '}
          {applicationCount === 1 ? 'application' : 'applications'} in this browser. Nothing is
          sent anywhere, and clearing your browser data will erase it, so export a backup now
          and then.
        </p>

        <Row
          title="Export as JSON"
          description="Download a backup file of all your applications."
          buttonLabel="Export"
          icon={Download}
          onClick={onExport}
          disabled={applicationCount === 0}
        />
        <Row
          title="Reset to sample data"
          description="Replaces everything with the demo applications."
          buttonLabel="Reset"
          icon={RotateCcw}
          onClick={onResetSample}
        />
        <Row
          title="Clear all applications"
          description="Permanently removes every application. Start with a blank board."
          buttonLabel="Clear all"
          icon={Trash2}
          onClick={onClearAll}
          disabled={applicationCount === 0}
          danger
        />
      </section>
    </div>
  )
}

export default Settings