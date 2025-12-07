const bannerId = 'qubiq-wallet-content-banner'

const mountBanner = () => {
  if (document.getElementById(bannerId)) return
  const banner = document.createElement('div')
  banner.id = bannerId
  banner.textContent = 'Qubiq Wallet content script active'
  banner.style.position = 'fixed'
  banner.style.bottom = '1rem'
  banner.style.right = '1rem'
  banner.style.padding = '0.5rem 0.75rem'
  banner.style.background = '#111827'
  banner.style.color = '#f9fafb'
  banner.style.fontSize = '0.85rem'
  banner.style.fontFamily = 'Inter, system-ui, sans-serif'
  banner.style.borderRadius = '999px'
  banner.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.25)'
  banner.style.zIndex = '2147483647'
  document.body.appendChild(banner)
}

const bootstrap = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountBanner)
    return
  }
  mountBanner()
}

bootstrap()

export {}
