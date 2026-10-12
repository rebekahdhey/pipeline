import type { Stage } from '../types/application'

export const stageOrder: Stage[] = ['applied', 'interview', 'offer', 'rejected']

export const stageConfig: Record<Stage, { label: string; badge: string; dot: string }> = {
  applied:   { label: 'Applied',   badge: 'bg-slate-100 text-slate-700',    dot: 'bg-slate-400' },
  interview: { label: 'Interview', badge: 'bg-indigo-50 text-indigo-700',   dot: 'bg-indigo-500' },
  offer:     { label: 'Offer',     badge: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  rejected:  { label: 'Rejected',  badge: 'bg-rose-50 text-rose-700',       dot: 'bg-rose-500' },
}