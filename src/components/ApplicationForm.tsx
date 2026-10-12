import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Trash2 } from 'lucide-react'
import type { Application, ApplicationInput, WorkMode } from '../types/application'
import { stageConfig, stageOrder } from '../data/stages'
import { todayISO } from '../utils/dates'
import { validate } from '../utils/validation'
import type { FormErrors, FormValues } from '../utils/validation'

type ApplicationFormProps = {
  initial?: Application
  onSubmit: (input: ApplicationInput) => void
  onCancel: () => void
  onDelete?: (id: string) => void
}

const workModes: WorkMode[] = ['Remote', 'Hybrid', 'On-site']

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'

type FieldProps = {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  )
}

function buildInitialValues(initial?: Application): FormValues {
  return {
    company: initial?.company ?? '',
    role: initial?.role ?? '',
    location: initial?.location ?? '',
    workMode: initial?.workMode ?? 'Remote',
    stage: initial?.stage ?? 'applied',
    dateApplied: initial?.dateApplied ?? todayISO(),
    salary: initial?.salary ?? '',
    notes: initial?.notes ?? '',
    link: initial?.link ?? '',
  }
}

function ApplicationForm({ initial, onSubmit, onCancel, onDelete }: ApplicationFormProps) {
  const [values, setValues] = useState<FormValues>(() => buildInitialValues(initial))
  const [errors, setErrors] = useState<FormErrors>({})

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    onSubmit({
      company: values.company.trim(),
      role: values.role.trim(),
      location: values.location.trim() || 'Not specified',
      workMode: values.workMode,
      stage: values.stage,
      dateApplied: values.dateApplied,
      salary: values.salary.trim() || undefined,
      notes: values.notes.trim() || undefined,
      link: values.link.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company *" htmlFor="company" error={errors.company}>
          <input
            id="company"
            type="text"
            value={values.company}
            onChange={(e) => setField('company', e.target.value)}
            placeholder="Northwind"
            className={inputClass}
          />
        </Field>

        <Field label="Role *" htmlFor="role" error={errors.role}>
          <input
            id="role"
            type="text"
            value={values.role}
            onChange={(e) => setField('role', e.target.value)}
            placeholder="Frontend Developer"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Location" htmlFor="location">
          <input
            id="location"
            type="text"
            value={values.location}
            onChange={(e) => setField('location', e.target.value)}
            placeholder="Manila, PH"
            className={inputClass}
          />
        </Field>

        <Field label="Work mode" htmlFor="workMode">
          <select
            id="workMode"
            value={values.workMode}
            onChange={(e) => setField('workMode', e.target.value as WorkMode)}
            className={inputClass}
          >
            {workModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Stage" htmlFor="stage">
          <select
            id="stage"
            value={values.stage}
            onChange={(e) => setField('stage', e.target.value as FormValues['stage'])}
            className={inputClass}
          >
            {stageOrder.map((stage) => (
              <option key={stage} value={stage}>
                {stageConfig[stage].label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Date applied *" htmlFor="dateApplied" error={errors.dateApplied}>
          <input
            id="dateApplied"
            type="date"
            value={values.dateApplied}
            max={todayISO()}
            onChange={(e) => setField('dateApplied', e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Salary" htmlFor="salary">
          <input
            id="salary"
            type="text"
            value={values.salary}
            onChange={(e) => setField('salary', e.target.value)}
            placeholder="₱70k–90k"
            className={inputClass}
          />
        </Field>

        <Field label="Job posting link" htmlFor="link" error={errors.link}>
          <input
            id="link"
            type="text"
            value={values.link}
            onChange={(e) => setField('link', e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Notes" htmlFor="notes">
        <textarea
          id="notes"
          rows={3}
          value={values.notes}
          onChange={(e) => setField('notes', e.target.value)}
          placeholder="Recruiter name, interview date, anything to remember..."
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="flex items-center justify-between pt-2">
        <div>
          {initial && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(initial.id)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            {initial ? 'Save changes' : 'Add application'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default ApplicationForm