import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useId, useState } from 'react'
import { springBouncy } from '../lib/motion'
import type { ManualSection } from '../data/manual'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'

interface AccordionItemProps {
  section: ManualSection
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ section, isOpen, onToggle }: AccordionItemProps) {
  const panelId = useId()
  const buttonId = useId()
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="shadow-pop-sm overflow-hidden rounded-3xl border-2 border-pop-ink bg-white"
      layout
      initial={false}
      whileHover={reduceMotion ? undefined : { scale: 1.005 }}
      transition={springBouncy}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pop-purple text-sm font-bold italic text-white"
              aria-hidden="true"
            >
              {section.id.replace('part-', '')}
            </span>
            <span>
              <span className="block text-lg font-bold text-pop-ink">
                {section.title}
                {section.placeholder && (
                  <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    TODO
                  </span>
                )}
              </span>
              {section.summary && (
                <span className="mt-0.5 block text-sm font-normal text-gray-500">
                  {section.summary}
                </span>
              )}
            </span>
          </span>
          <svg
            className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={springBouncy}
            className="overflow-hidden border-t border-gray-100 px-6 py-5"
          >
        {section.paragraphs?.map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed text-gray-700 last:mb-0">
            {p}
          </p>
        ))}

        {section.steps && (
          <ol className="my-4 list-decimal space-y-2 pl-5 text-gray-700">
            {section.steps.map((step, i) => (
              <li key={i} className="mb-2 leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        )}

        {section.codeBlocks?.map((block, i) => (
          <CodeBlock key={i} code={block.code} language={block.language} />
        ))}

        {section.wiringTable && (
          <div className="my-4 overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <caption className="sr-only">Wiring connections between Raspberry Pi and PCA9685</caption>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
                    Pi Pin
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
                    PCA9685 Pin
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
                    Wire Color
                  </th>
                  <th scope="col" className="hidden px-4 py-3 text-left font-semibold text-gray-900 sm:table-cell">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {section.wiringTable.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                      {row.piPin}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.pca9685Pin}</td>
                    <td className="px-4 py-3 text-gray-700">{row.wireColor}</td>
                    <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">
                      {row.notes ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {section.table && (
          <div className="my-4 overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {section.table.headers.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-3 text-left font-semibold text-gray-900"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {section.table.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {section.callouts?.map((callout, i) => (
          <Callout key={i} callout={callout} />
        ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface BuildManualProps {
  parts: ManualSection[]
}

export function BuildManual({ parts }: BuildManualProps) {
  const [openId, setOpenId] = useState<string | null>('part-1')

  return (
    <div className="space-y-4">
      {parts.map((section) => (
        <AccordionItem
          key={section.id}
          section={section}
          isOpen={openId === section.id}
          onToggle={() =>
            setOpenId((current) => (current === section.id ? null : section.id))
          }
        />
      ))}
    </div>
  )
}
