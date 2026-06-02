import { codingCopyPaste } from '../data/manual'

const partIconSrc: Record<number, string> = {
  1: '/part-icons/part-1.png',
  2: '/part-icons/part-2.png',
  3: '/part-icons/part-3.png',
}

export function CopyPasteBlocks() {
  return (
    <section className="mt-12 border-t-2 border-pop-ink/10 pt-12" aria-label="Coding copy and paste">
      <h3 className="mb-2 text-xl font-bold italic text-pop-teal">Coding (copy/paste)</h3>
      <p className="mb-8 max-w-2xl text-pop-ink/70">
        Copy these snippets into your IDE or notes while you’re building.
      </p>

      <div className="grid min-w-0 gap-6">
        {codingCopyPaste.map((block) => (
          <div key={`${block.part}-${block.step}`} className="card-pop min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <div className="mt-0.5 flex shrink-0 items-center gap-3">
                  <div
                    className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-pop-ink bg-white shadow-pop-sm"
                    aria-label={`Part ${block.part}`}
                  >
                    {partIconSrc[block.part] ? (
                      <img
                        src={partIconSrc[block.part]}
                        alt=""
                        className="h-14 w-14 select-none object-contain"
                        draggable={false}
                      />
                    ) : (
                      <div className="px-2 text-center text-xs font-extrabold uppercase tracking-wider text-pop-ink">
                        Part {block.part}
                      </div>
                    )}
                  </div>

                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-pop-ink bg-pop-lemon text-lg font-black text-pop-ink shadow-pop-sm"
                    aria-label={`Step ${block.step}`}
                  >
                    {block.step}
                  </div>
                </div>
                <div className="min-w-0">
                  <h4 className="text-lg font-bold text-pop-ink">{block.title}</h4>
                  {block.description ? (
                    <p className="text-sm text-pop-ink/60">{block.description}</p>
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                className="btn-pop shrink-0 rounded-full px-4 py-2 text-sm"
                onClick={() => navigator.clipboard.writeText(block.content)}
              >
                Copy
              </button>
            </div>

            <div className="mt-4 min-w-0 w-full overflow-x-auto rounded-xl border border-pop-ink/15 bg-pop-ink/95">
              <pre className="w-max min-w-full whitespace-pre p-4 font-mono text-sm leading-relaxed text-white">
                {block.content}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

