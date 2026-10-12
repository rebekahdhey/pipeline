import type { Application } from '../types/application'

export type Stats = {
  total: number
  interviews: number
  offers: number
  responseRate: number 
}

export function computeStats(applications: Application[]): Stats {
  const total = applications.length
  const interviews = applications.filter((a) => a.stage === 'interview').length
  const offers = applications.filter((a) => a.stage === 'offer').length
  const responded = applications.filter((a) => a.stage !== 'applied').length

  return {
    total,
    interviews,
    offers,
    responseRate: total === 0 ? 0 : Math.round((responded / total) * 100),
  }
}