import type { Stage, WorkMode } from '../types/application'
import { todayISO } from './dates'

export type FormValues = {
  company: string
  role: string
  location: string
  workMode: WorkMode
  stage: Stage
  dateApplied: string
  salary: string
  notes: string
  link: string
}

export type FormErrors = Partial<Record<keyof FormValues, string>>

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.company.trim()) errors.company = 'Company is required.'
  if (!values.role.trim()) errors.role = 'Role is required.'

  if (!values.dateApplied) {
    errors.dateApplied = 'Pick the date you applied.'
  } else if (values.dateApplied > todayISO()) {
    errors.dateApplied = "The date can't be in the future."
  }

  const link = values.link.trim()
  if (link && !/^https?:\/\//i.test(link)) {
    errors.link = 'Links must start with http:// or https://'
  }

  return errors
}