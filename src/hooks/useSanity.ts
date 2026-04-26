import { useState, useEffect, useCallback } from 'react'
import { sanityClient } from '@/sanity/client'

// Generic hook for fetching any Sanity query
export function useSanityQuery<T>(query: string, params: Record<string, any> = {}) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('[Sanity] Fetching query:', query.substring(0, 60) + '...')
      const result = await sanityClient.fetch<T>(query, params)
      console.log('[Sanity] Success:', result)
      setData(result)
    } catch (err) {
      console.error('[Sanity] Fetch error:', err)
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [query, JSON.stringify(params)])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Hook for fetching a single document
export function useSanityDocument<T>(query: string) {
  return useSanityQuery<T>(query)
}

// Hook for fetching a list of documents
export function useSanityList<T>(query: string) {
  const { data, loading, error, refetch } = useSanityQuery<T[]>(query)
  return { data: data || [], loading, error, refetch }
}
