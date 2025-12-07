const log = (...messages: unknown[]) => console.log('[qubiq-wallet]', ...messages)

chrome.runtime.onInstalled.addListener(({ reason }: chrome.runtime.InstalledDetails) => {
  log(`Extension installed (${reason}).`)
  if (reason === 'install') {
    chrome.runtime.openOptionsPage()
  }
})

chrome.action.onClicked.addListener(() => {
  log('Browser action clicked')
})

chrome.storage.onChanged.addListener((changes: Record<string, chrome.storage.StorageChange>, areaName: chrome.storage.AreaName) => {
  const relevantChanges = Object.fromEntries(
    Object.entries(changes).filter(([key]) => key.startsWith('qubiq-wallet')),
  )
  if (Object.keys(relevantChanges).length === 0) return
  log(`Storage updated in ${areaName}:`, relevantChanges)
})
