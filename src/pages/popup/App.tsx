import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'

const STORAGE_KEY = 'qubiq-wallet:accent-color'
type AccentColorStoragePayload = Partial<Record<typeof STORAGE_KEY, string>>

const App = () => {
  const [platformInfo, setPlatformInfo] = useState<chrome.runtime.PlatformInfo | null>(null)
  const [accentColor, setAccentColor] = useState('#2563eb')

  useEffect(() => {
    chrome.runtime.getPlatformInfo((info) => setPlatformInfo(info))
    chrome.storage.sync.get(STORAGE_KEY, (result: AccentColorStoragePayload) => {
      const storedColor = result?.[STORAGE_KEY]
      if (storedColor) {
        setAccentColor(storedColor)
      }
    })
  }, [])

  const platformDescription = useMemo(() => {
    if (!platformInfo) return 'Loading platform info...'
    return `${platformInfo.os} · ${platformInfo.arch}`
  }, [platformInfo])

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setAccentColor(value)
    chrome.storage.sync.set({ [STORAGE_KEY]: value })
  }

  return (
    <main className="flex w-[360px] flex-col gap-5 rounded-2xl bg-slate-950 p-6 text-slate-100">
      <header className="border-b-2 border-white/10 pb-4 text-center" style={{ borderColor: accentColor }}>
        <div className="mb-3 flex justify-center gap-4">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img
              src={viteLogo}
              className="h-12 transition-[filter] duration-200 hover:drop-shadow-[0_0_2em_rgba(100,108,255,0.67)]"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img
              src={reactLogo}
              className="h-12 transition-[filter] duration-200 hover:drop-shadow-[0_0_2em_rgba(97,218,251,0.67)]"
              alt="React logo"
            />
          </a>
        </div>
        <h1 className="text-2xl font-semibold">Qubiq Wallet</h1>
        <p className="mt-1 text-sm text-white/70">{platformDescription}</p>
      </header>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <h2 className="text-base font-semibold text-white">Quick start</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-white/90">
          <li>
            Run <code className="rounded bg-white/10 px-1 py-0.5 text-xs font-mono text-white">npm run dev</code> to start
            the watcher.
          </li>
          <li>
            Load the <code className="rounded bg-white/10 px-1 py-0.5 text-xs font-mono text-white">dist</code> folder as
            an unpacked extension.
          </li>
          <li>
            Hack in <code className="rounded bg-white/10 px-1 py-0.5 text-xs font-mono text-white">src/pages/popup</code>{' '}
            and see live reloads.
          </li>
        </ol>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <h2 className="text-base font-semibold text-white">Accent color</h2>
        <label className="mt-3 flex items-center gap-3 text-sm text-white/90">
          <input
            type="color"
            value={accentColor}
            onChange={handleColorChange}
            aria-label="Accent color"
            className="h-10 w-10 cursor-pointer rounded-full border border-white/20 bg-transparent p-1 transition hover:border-white/40"
          />
          <span className="font-mono text-base tracking-tight">{accentColor}</span>
        </label>
      </section>
    </main>
  )
}

export default App
