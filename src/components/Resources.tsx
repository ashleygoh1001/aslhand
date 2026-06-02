import { motion } from 'framer-motion'
import {
  downloads,
  getHelp,
  partsList,
  toolsList,
} from '../data/manual'
import { SectionHeading } from './SectionHeading'

export function Resources() {
  return (
    <section className="section-padding bg-gray-50" aria-labelledby="resources-heading">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="resources"
          title="Resources"
          subtitle="Parts, tools, downloads, and where to get help on campus."
        />

        {/* Parts list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Parts list</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <caption className="sr-only">Required parts for the ASL fingerspelling hand build</caption>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
                    Item
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
                    Qty
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
                    What it&apos;s for
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {partsList.map((part, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {/* TODO: Replace href="#" with real vendor links in src/data/manual.ts */}
                      {part.href ? (
                        <a
                          href={part.href}
                          className="text-dartmouth-green underline decoration-dartmouth-green/30 underline-offset-2 hover:decoration-dartmouth-green"
                        >
                          {part.item}
                        </a>
                      ) : (
                        part.item
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      {part.quantity}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{part.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Tools */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Tools you&apos;ll need</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {toolsList.map((tool, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm"
              >
                <span className="mt-0.5 text-dartmouth-green" aria-hidden="true">
                  ✓
                </span>
                {tool}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Downloads */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Downloads</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {downloads.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dartmouth-green"
              >
                {/* TODO: Update download hrefs in src/data/manual.ts */}
                <span className="text-sm font-semibold text-dartmouth-green group-hover:underline">
                  {item.label} ↓
                </span>
                <span className="mt-2 text-sm text-gray-600">{item.description}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Get help */}
        <motion.div
          className="mt-12 rounded-2xl border border-dartmouth-green/20 bg-dartmouth-green-light p-6 sm:p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-dartmouth-green-dark">
            {getHelp.title}
          </h3>
          <p className="mt-2 max-w-2xl text-gray-700">{getHelp.description}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* TODO: Replace getHelp.href with real Dartmouth makerspace URL */}
            <a
              href={getHelp.href}
              className="inline-flex items-center justify-center rounded-lg bg-dartmouth-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-dartmouth-green-dark"
            >
              {getHelp.linkLabel}
            </a>
            {getHelp.email && (
              <a
                href={`mailto:${getHelp.email}`}
                className="text-sm font-medium text-dartmouth-green underline underline-offset-2 hover:text-dartmouth-green-dark"
              >
                {getHelp.email}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
