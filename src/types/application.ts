export type Stage = 'applied' | 'interview' | 'offer' | 'rejected'

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site'

export type Application = {
  id: string
  company: string
  role: string
  location: string
  workMode: WorkMode
  stage: Stage
  dateApplied: string // 'YYYY-MM-DD'
  salary?: string
  notes?: string
  link?: string
}

export type ApplicationInput = Omit<Application, 'id'>