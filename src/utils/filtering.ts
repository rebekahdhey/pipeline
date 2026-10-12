import type { Application, Stage, WorkMode } from '../types/application'
import { stageOrder } from '../data/stages'

export type StageFilter = Stage | 'all'
export type ModeFilter = WorkMode | 'all'
export type SortKey = 'newest' | 'oldest' | 'company' | 'stage'

export type Filters = {
  search: string
  stage: StageFilter
  workMode: ModeFilter
  sort: SortKey
}

export const defaultFilters: Filters = {
  search: '',
  stage: 'all',
  workMode: 'all',
  sort: 'newest',
}

export function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.search.trim() !== '' ||
    filters.stage !== 'all' ||
    filters.workMode !== 'all'
  )
}

export function filterAndSort(applications: Application[], filters: Filters): Application[] {
  const query = filters.search.trim().toLowerCase()

  const result = applications.filter((app) => {
    const matchesSearch =
      query === '' ||
      [app.company, app.role, app.location, app.notes ?? ''].some((field) =>
        field.toLowerCase().includes(query)
      )
    const matchesStage = filters.stage === 'all' || app.stage === filters.stage
    const matchesMode = filters.workMode === 'all' || app.workMode === filters.workMode

    return matchesSearch && matchesStage && matchesMode
  })

  return result.sort((a, b) => {
    switch (filters.sort) {
      case 'newest':
        return b.dateApplied.localeCompare(a.dateApplied)
      case 'oldest':
        return a.dateApplied.localeCompare(b.dateApplied)
      case 'company':
        return a.company.localeCompare(b.company)
      case 'stage':
        return stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage)
    }
  })
}