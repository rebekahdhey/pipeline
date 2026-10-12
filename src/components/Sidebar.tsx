import { Briefcase, LayoutDashboard, ListChecks, Settings, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { View } from '../types/view'

type NavItem = {
  id: View
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'applications', label: 'Applications', icon: ListChecks },
  { id: 'settings', label: 'Settings', icon: Settings },
]

type SidebarProps = {
  activeView: View
  onNavigate: (view: View) => void
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ activeView, onNavigate, isOpen, onClose }: SidebarProps) {
  const handleNavigate = (view: View) => {
    onNavigate(view)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-900">Pipeline</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeView

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-slate-200 p-4 text-xs text-slate-400">
          Track every application in one place.
        </div>
      </aside>
    </>
  )
}

export default Sidebar