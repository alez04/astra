import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

const OPTIONS_STORAGE_KEY = 'qubiq-wallet:options'

type OptionsStore = {
  username: string
  debugMode: boolean
}

type OptionsStoragePayload = Partial<Record<typeof OPTIONS_STORAGE_KEY, OptionsStore>>

const defaultOptions: OptionsStore = {
  username: 'Explorer',
  debugMode: false,
}

const App = () => {
  const [options, setOptions] = useState<OptionsStore>(defaultOptions)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => {
    chrome.storage.sync.get(OPTIONS_STORAGE_KEY, (result: OptionsStoragePayload) => {
      const storedOptions = result?.[OPTIONS_STORAGE_KEY]
      if (storedOptions) {
        setOptions(storedOptions)
      }
    })
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('saving')
    chrome.storage.sync.set({ [OPTIONS_STORAGE_KEY]: options }, () => {
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 1500)
    })
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12 text-slate-50">
      <header className="text-center">
        <h1 className="text-3xl font-semibold">Qubiq Wallet · Options</h1>
        <p className="mt-2 text-base text-slate-200">Use this space to shape the future popup & background behavior.</p>
      </header>

      <form
        className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          <span className="text-sm font-medium">Display name</span>
          <input
            className="rounded-lg border border-white/20 bg-white/90 px-3 py-2 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-2 focus:ring-sky-500/60"
            name="username"
            value={options.username}
            onChange={(event) => setOptions({ ...options, username: event.target.value })}
            placeholder="Explorer"
          />
        </label>

        <label className="flex items-center gap-3 text-sm text-slate-200">
          <input
            className="size-4 rounded border border-white/40 text-sky-400 focus:ring-sky-400"
            type="checkbox"
            name="debugMode"
            checked={options.debugMode}
            onChange={(event) => setOptions({ ...options, debugMode: event.target.checked })}
          />
          <span>Enable verbose logging</span>
        </label>

        <button
          type="submit"
          disabled={status === 'saving'}
          className="rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-progress disabled:opacity-60"
        >
          {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved!' : 'Save changes'}
        </button>
      </form>
    </main>
  )
}

export default App
