import type { Callout as CalloutType } from '../data/manual'

const styles = {
  warning: {
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    icon: '⚠️',
    title: 'text-amber-900',
    body: 'text-amber-800',
  },
  caution: {
    border: 'border-orange-500',
    bg: 'bg-orange-50',
    icon: '⚡',
    title: 'text-orange-900',
    body: 'text-orange-800',
  },
  info: {
    border: 'border-dartmouth-green',
    bg: 'bg-dartmouth-green-light',
    icon: 'ℹ️',
    title: 'text-dartmouth-green-dark',
    body: 'text-gray-700',
  },
}

interface CalloutProps {
  callout: CalloutType
}

export function Callout({ callout }: CalloutProps) {
  const s = styles[callout.type]

  return (
    <aside
      className={`my-4 flex gap-3 rounded-r-lg border-l-4 ${s.border} ${s.bg} p-4`}
      role="note"
      aria-label={`${callout.type}: ${callout.title}`}
    >
      <span className="text-xl shrink-0" aria-hidden="true">
        {s.icon}
      </span>
      <div>
        <p className={`font-semibold ${s.title}`}>{callout.title}</p>
        <p className={`mt-1 text-sm leading-relaxed ${s.body}`}>{callout.body}</p>
      </div>
    </aside>
  )
}
