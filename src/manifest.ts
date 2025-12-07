import type { ManifestV3Export } from '@crxjs/vite-plugin'

const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: 'Qubiq Wallet DevTools',
  description: 'Starter Chrome extension powered by React and Vite.',
  version: '0.0.1',
  minimum_chrome_version: '114',
  action: {
    default_title: 'Qubiq Wallet',
    default_popup: 'src/pages/popup/index.html',
  },
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.ts'],
      run_at: 'document_idle',
    },
  ],
  permissions: ['storage', 'activeTab', 'scripting'],
  host_permissions: ['<all_urls>'],
}

export default manifest
