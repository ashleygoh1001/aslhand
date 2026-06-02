import { CopyPasteBlocks } from '../components/CopyPasteBlocks'
import { ManualBook } from '../components/ManualBook'
import { SectionHeading } from '../components/SectionHeading'
import { ManualDownloads } from '../components/ManualDownloads'

export function BuildManualPage() {
  return (
    <section className="section-padding" aria-labelledby="build-manual-heading">
      <div className="mx-auto min-w-0 max-w-6xl">
        <SectionHeading
          id="build-manual-heading"
          title="Build Manual"
          subtitle="Scroll through the full instruction manual, then copy/paste the coding steps below."
        />

        <ManualDownloads />

        <ManualBook />

        <CopyPasteBlocks />
      </div>
    </section>
  )
}
