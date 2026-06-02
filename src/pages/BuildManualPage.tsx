import { BuildManual } from '../components/BuildManual'
import { SectionHeading } from '../components/SectionHeading'
import { manualParts } from '../data/manual'

export function BuildManualPage() {
  return (
    <section className="section-padding" aria-labelledby="build-manual-heading">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="build-manual-heading"
          title="Build Manual"
          subtitle="Step-by-step instructions from parts checklist through calibration. Expand each part as you work through the build."
        />
        <BuildManual parts={manualParts} />
      </div>
    </section>
  )
}
