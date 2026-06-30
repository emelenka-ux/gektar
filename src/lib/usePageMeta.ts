import { useEffect } from 'react'

/** Устанавливает <title> и meta description для текущей страницы (SPA / HashRouter). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (description) {
      let el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', 'description')
        document.head.appendChild(el)
      }
      el.setAttribute('content', description)
    }
  }, [title, description])
}
