export function trackOutbound(url: string, title?: string) {
  try {
    const payload = JSON.stringify({
      url,
      title,
      sourcePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    })

    // sendBeacon is the most reliable way to log during/around navigation.
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon('/api/analytics/outbound', blob)
      return
    }

    // Fallback for browsers without sendBeacon.
    fetch('/api/analytics/outbound', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Analytics must never break navigation.
  }
}
