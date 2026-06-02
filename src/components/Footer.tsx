export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-canvas py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
        <p>
          Voice-Controlled ASL Fingerspelling Hand — a Dartmouth student build project.
        </p>
        <p className="mt-1">
          Built to help students make their own. Content in{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs">
            src/data/manual.ts
          </code>
          .
        </p>
      </div>
    </footer>
  )
}
