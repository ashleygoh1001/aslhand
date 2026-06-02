import { BuildManual } from '../components/BuildManual'
import { ManualBook } from '../components/ManualBook'
import { SectionHeading } from '../components/SectionHeading'
import { manualParts } from '../data/manual'

export function BuildManualPage() {
  return (
    <section className="section-padding" aria-labelledby="build-manual-heading">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="build-manual-heading"
          title="Build Manual"
          subtitle="Scroll through the full instruction manual, then expand each build phase below."
        />

        <ManualBook />

        <div className="mt-8 border-t-2 border-pop-ink/10 pt-12">
          <h3 className="mb-6 text-xl font-bold italic text-pop-teal">
            Build phases (quick reference)
          </h3>
          <BuildManual parts={manualParts} />
        </div>
      </div>
    </section>
  )
}
