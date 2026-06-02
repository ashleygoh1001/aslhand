import { pdfManual, stlFiles } from '../data/manual'

type DownloadCardProps = {
  label: string
  description: string
  href: string
  buttonLabel: string
  accentClass: string
  download?: string
  external?: boolean
}

function DownloadCard({
  label,
  description,
  href,
  buttonLabel,
  accentClass,
  download,
  external = false,
}: DownloadCardProps) {
  return (
    <div className={`card-pop flex flex-col gap-4 border-l-4 ${accentClass} sm:flex-row sm:items-center sm:justify-between`}>
      <div className="min-w-0">
        <h3 className="text-lg font-bold text-pop-ink">{label}</h3>
        <p className="mt-1 text-sm leading-relaxed text-pop-ink/75">{description}</p>
      </div>
      <a
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="btn-pop shrink-0 px-5 py-2.5 text-center text-sm"
      >
        {buttonLabel}
      </a>
    </div>
  )
}

export function ManualDownloads() {
  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-2">
      <DownloadCard
        label={stlFiles.label}
        description={stlFiles.description}
        href={stlFiles.href}
        buttonLabel="Open STL folder ↗"
        accentClass="border-l-pop-coral"
        external
      />
      <DownloadCard
        label={pdfManual.label}
        description={pdfManual.description}
        href={pdfManual.href}
        buttonLabel="Download PDF ↓"
        accentClass="border-l-pop-purple"
        download={pdfManual.downloadFilename}
      />
    </div>
  )
}
