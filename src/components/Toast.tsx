import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'

type ToastProps = {
  message: string
  onDismiss: () => void
}

function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div
        role="status"
        className="animate-toast pointer-events-auto flex items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg"
      >
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        {message}
      </div>
    </div>
  )
}

export default Toast