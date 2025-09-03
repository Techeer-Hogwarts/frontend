'use client'

import { useMemo, useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export type Filters = {
  selectedPosition: string[]
  selectedYear: string[]
  selectedUniversity: string[]
  selectedGrade: string[]
  selectedSortBy: string[]
}

const DEFAULTS: Filters = {
  selectedPosition: [],
  selectedYear: [],
  selectedUniversity: [],
  selectedGrade: [],
  selectedSortBy: ['기수순'],
}

const MAP = {
  selectedPosition: 'position',
  selectedYear: 'year',
  selectedUniversity: 'university',
  selectedGrade: 'grade',
  selectedSortBy: 'sortBy',
} as const satisfies Record<keyof Filters, string>

function parseFromParams(params: URLSearchParams): Filters {
  const toArr = (key: string) => params.getAll(key).filter(Boolean)

  const parsed: Filters = {
    selectedPosition: toArr(MAP.selectedPosition),
    selectedYear: toArr(MAP.selectedYear),
    selectedUniversity: toArr(MAP.selectedUniversity),
    selectedGrade: toArr(MAP.selectedGrade),
    selectedSortBy: toArr(MAP.selectedSortBy),
  }

  if (parsed.selectedSortBy.length === 0) {
    parsed.selectedSortBy = [...DEFAULTS.selectedSortBy]
  }

  return parsed
}

function mergeParams(base: URLSearchParams, filters: Filters): URLSearchParams {
  const next = new URLSearchParams(base.toString())

  Object.values(MAP).forEach((k) => next.delete(k))

  const addAll = (key: string, values: string[]) => {
    // 중복 제거 + 캐논 정렬로 네비게이션 불필요 호출 방지
    const uniq = Array.from(new Set(values.filter(Boolean)))
    const canon = uniq.slice().sort()
    canon.forEach((v) => next.append(key, v))
  }

  if (filters.selectedPosition.length > 0) {
    addAll(MAP.selectedPosition, filters.selectedPosition)
  }
  if (filters.selectedYear.length > 0) {
    addAll(MAP.selectedYear, filters.selectedYear)
  }
  if (filters.selectedUniversity.length > 0) {
    addAll(MAP.selectedUniversity, filters.selectedUniversity)
  }
  if (filters.selectedGrade.length > 0) {
    addAll(MAP.selectedGrade, filters.selectedGrade)
  }
  if (filters.selectedSortBy.length > 0) {
    const pick = filters.selectedSortBy[0]
    if (pick !== DEFAULTS.selectedSortBy[0])
      next.append(MAP.selectedSortBy, pick)
  }

  return next
}

export function useUrlQueryFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = useMemo<Filters>(() => {
    const params = new URLSearchParams(searchParams?.toString())
    return parseFromParams(params)
  }, [searchParams])

  const timerRef = useRef<number | null>(null)
  const pendingRef = useRef<URLSearchParams | null>(null)

  const commit = useCallback(
    (nextParams: URLSearchParams, mode: 'replace' | 'push' = 'replace') => {
      const current = searchParams?.toString() ?? ''
      const next = nextParams.toString()
      if (current === next) return

      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
      pendingRef.current = nextParams
      timerRef.current = window.setTimeout(() => {
        const q = pendingRef.current?.toString()
        const url = q && q.length > 0 ? `${pathname}?${q}` : pathname
        if (mode === 'push') router.push(url, { scroll: false })
        else router.replace(url, { scroll: false })
        pendingRef.current = null
        timerRef.current = null
      }, 0)
    },
    [pathname, router, searchParams],
  )

  type K = keyof Filters
  const set = useCallback(
    (name: K, value: Filters[K], nav: 'replace' | 'push' = 'replace') => {
      const current = new URLSearchParams(searchParams?.toString())
      const nextFilters: Filters = { ...filters, [name]: value }
      const merged = mergeParams(current, nextFilters)
      commit(merged, nav)
    },
    [filters, searchParams, commit],
  )

  const add = useCallback(
    (name: K, value: string, nav: 'replace' | 'push' = 'replace') => {
      const arr = new Set((filters[name] as string[]) ?? [])
      arr.add(value)
      set(name, Array.from(arr) as Filters[K], nav)
    },
    [filters, set],
  )

  const remove = useCallback(
    (name: K, value: string, nav: 'replace' | 'push' = 'replace') => {
      const arr = ((filters[name] as string[]) ?? []).filter((v) => v !== value)
      set(name, arr as Filters[K], nav)
    },
    [filters, set],
  )

  const clear = useCallback(
    (nav: 'replace' | 'push' = 'replace') => {
      const current = new URLSearchParams(searchParams?.toString())
      const merged = mergeParams(current, DEFAULTS)
      commit(merged, nav)
    },
    [searchParams, commit],
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  return { filters, set, add, remove, clear, router }
}
