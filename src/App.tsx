import { useCallback, useState } from 'react'
import ApplicationForm from './components/ApplicationForm'
import ApplicationList from './components/ApplicationList'
import Dashboard from './components/Dashboard'
import EmptyState from './components/EmptyState'
import FilterBar from './components/FilterBar'
import Modal from './components/Modal'
import Settings from './components/Settings'
import Sidebar from './components/Sidebar'
import Toast from './components/Toast'
import Topbar from './components/Topbar'
import { sampleApplications } from './data/sampleApplications'
import { stageConfig } from './data/stages'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Application, ApplicationInput, Stage } from './types/application'
import type { View } from './types/view'
import { todayISO } from './utils/dates'
import { downloadJSON } from './utils/exportData'
import { defaultFilters, filterAndSort, hasActiveFilters } from './utils/filtering'
import type { Filters } from './utils/filtering'

const viewTitles: Record<View, string> = {
  dashboard: 'Dashboard',
  applications: 'Applications',
  settings: 'Settings',
}

type FormState = { mode: 'add' } | { mode: 'edit'; application: Application } | null
type ToastState = { id: number; message: string } | null

function App() {
  const [activeView, setActiveView] = useState<View>('dashboard')
  const [applications, setApplications] = useLocalStorage<Application[]>(
    'pipeline:applications',
    sampleApplications
  )
  const [formState, setFormState] = useState<FormState>(null)
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [toast, setToast] = useState<ToastState>(null)

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message })
  }, [])

  const dismissToast = useCallback(() => setToast(null), [])

  const visibleApplications = filterAndSort(applications, filters)

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const resetFilters = () => setFilters(defaultFilters)

  const handleSearchChange = (value: string) => {
    updateFilter('search', value)
    if (value !== '') setActiveView('applications')
  }

  const moveApplication = (id: string, stage: Stage) => {
    setApplications((current) =>
      current.map((app) => (app.id === id ? { ...app, stage } : app))
    )
    showToast(`Moved to ${stageConfig[stage].label}`)
  }

  const addApplication = (input: ApplicationInput) => {
    const newApp: Application = { id: crypto.randomUUID(), ...input }
    setApplications((current) => [newApp, ...current])
    showToast('Application added')
  }

  const updateApplication = (id: string, input: ApplicationInput) => {
    setApplications((current) =>
      current.map((app) => (app.id === id ? { id, ...input } : app))
    )
    showToast('Changes saved')
  }

  const deleteApplication = (id: string) => {
    if (!window.confirm("Delete this application? This can't be undone.")) return
    setApplications((current) => current.filter((app) => app.id !== id))
    setFormState(null)
    showToast('Application deleted')
  }

  const resetToSample = () => {
    if (!window.confirm('Replace all your applications with the sample data?')) return
    setApplications(sampleApplications)
    resetFilters()
    showToast('Sample data restored')
  }

  const clearAll = () => {
    if (!window.confirm("Delete ALL applications? This can't be undone.")) return
    setApplications([])
    resetFilters()
    showToast('All applications cleared')
  }

  const exportData = () => {
    downloadJSON(applications, `pipeline-applications-${todayISO()}.json`)
    showToast('Data exported')
  }

  const handleSubmit = (input: ApplicationInput) => {
    if (formState?.mode === 'edit') {
      updateApplication(formState.application.id, input)
    } else {
      addApplication(input)
    }
    setFormState(null)
  }

  const openAdd = () => setFormState({ mode: 'add' })
  const openEdit = (application: Application) => setFormState({ mode: 'edit', application })
  const closeForm = () => setFormState(null)

  return (
    <div className="min-h-screen">
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="lg:pl-64">
        <Topbar
          title={viewTitles[activeView]}
          search={filters.search}
          onSearchChange={handleSearchChange}
          onAdd={openAdd}
          onMenuClick={() => setMenuOpen(true)}
        />

        <main className="p-4 sm:p-6">
          {activeView === 'dashboard' && (
            <Dashboard
              applications={applications}
              onMove={moveApplication}
              onEdit={openEdit}
            />
          )}

          {activeView === 'applications' && (
            <div className="space-y-4">
              <FilterBar
                filters={filters}
                onChange={updateFilter}
                onReset={resetFilters}
                resultCount={visibleApplications.length}
                totalCount={applications.length}
              />

              {visibleApplications.length > 0 ? (
                <ApplicationList applications={visibleApplications} onEdit={openEdit} />
              ) : applications.length === 0 ? (
                <EmptyState
                  title="No applications yet"
                  message="Add your first application to start tracking your job hunt."
                  actionLabel="Add application"
                  onAction={openAdd}
                />
              ) : (
                <EmptyState
                  title="No matches"
                  message="Nothing fits your search and filters. Try a different word or clear them."
                  actionLabel={hasActiveFilters(filters) ? 'Clear filters' : undefined}
                  onAction={resetFilters}
                />
              )}
            </div>
          )}

          {activeView === 'settings' && (
            <Settings
              applicationCount={applications.length}
              onExport={exportData}
              onResetSample={resetToSample}
              onClearAll={clearAll}
            />
          )}
        </main>
      </div>

      {formState && (
        <Modal
          title={formState.mode === 'edit' ? 'Edit application' : 'Add application'}
          onClose={closeForm}
        >
          <ApplicationForm
            initial={formState.mode === 'edit' ? formState.application : undefined}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            onDelete={deleteApplication}
          />
        </Modal>
      )}

      {toast && <Toast key={toast.id} message={toast.message} onDismiss={dismissToast} />}
    </div>
  )
}

export default App