'use client'

import { useMemo, useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export type Filters = {
  selectedPosition: string[]
  selectedYear: string[]
  selectedUniversity: string[]
  selectedGrade: string[]
  selectedSortBy: string[]
  selectedRecruitment: string[]
  selectedProgress: string[]
  selectedCategory: string
  selectedPartners: string[]
  selectedBootcamp: string[]
}

const DEFAULTS: Filters = {
  selectedPosition: [],
  selectedYear: [],
  selectedUniversity: [],
  selectedGrade: [],
  selectedSortBy: ['기수순'],
  selectedRecruitment: [],
  selectedProgress: [],
  selectedCategory: '전체',
  selectedPartners: [],
  selectedBootcamp: [],
}

const MAP = {
  selectedPosition: 'position',
  selectedYear: 'year',
  selectedUniversity: 'university',
  selectedGrade: 'grade',
  selectedSortBy: 'sortBy',
  selectedRecruitment: 'recruitment',
  selectedProgress: 'progress',
  selectedCategory: 'category',
  selectedPartners: 'partners',
  selectedBootcamp: 'bootcamp',
} as const satisfies Record<keyof Filters, string>

function parseFromParams(params: URLSearchParams): Filters {
  const toArr = (key: string) => params.getAll(key).filter(Boolean)

  const parsed: Filters = {
    selectedPosition: toArr(MAP.selectedPosition),
    selectedYear: toArr(MAP.selectedYear),
    selectedUniversity: toArr(MAP.selectedUniversity),
    selectedGrade: toArr(MAP.selectedGrade),
    selectedSortBy: toArr(MAP.selectedSortBy),
    selectedRecruitment: toArr(MAP.selectedRecruitment),
    selectedProgress: toArr(MAP.selectedProgress),
    selectedCategory:
      params.get(MAP.selectedCategory) || DEFAULTS.selectedCategory,
    selectedPartners: toArr(MAP.selectedPartners),
    selectedBootcamp: toArr(MAP.selectedBootcamp),
  }

  if (parsed.selectedSortBy.length === 0) {
    parsed.selectedSortBy = [...DEFAULTS.selectedSortBy]
  }

  return parsed
}

function mergeParams(base: URLSearchParams, filters: Filters): URLSearchParams {
  const next = new URLSearchParams(base.toString())

  // 기존 관련 키 제거
  Object.values(MAP).forEach((k) => next.delete(k))

  // 공통 유틸: 중복 제거 → 결정적 정렬 → append
  const addAll = (key: string, values: string[] | undefined) => {
    if (!values || values.length === 0) return
    const uniq = Array.from(new Set(values.filter(Boolean)))
    const canon = uniq
      .slice()
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
      )
    canon.forEach((v) => next.append(key, v))
  }

  // 단순 배열 파라미터들을 일괄 처리
  const arrayParams: Array<[string, string[] | undefined]> = [
    [MAP.selectedPosition, filters.selectedPosition],
    [MAP.selectedYear, filters.selectedYear],
    [MAP.selectedUniversity, filters.selectedUniversity],
    [MAP.selectedGrade, filters.selectedGrade],
    [MAP.selectedRecruitment, filters.selectedRecruitment],
    [MAP.selectedProgress, filters.selectedProgress],
    [MAP.selectedPartners, filters.selectedPartners],
    [MAP.selectedBootcamp, filters.selectedBootcamp],
  ]
  arrayParams.forEach(([key, values]) => addAll(key, values))

  // 단일 선택 파라미터들 처리
  const sortPick = filters.selectedSortBy?.[0]
  if (sortPick && sortPick !== DEFAULTS.selectedSortBy[0]) {
    next.append(MAP.selectedSortBy, sortPick)
  }

  const categoryPick = filters.selectedCategory
  if (categoryPick && categoryPick !== DEFAULTS.selectedCategory) {
    next.set(MAP.selectedCategory, categoryPick)
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
      set(name, Array.from(arr), nav)
    },
    [filters, set],
  )

  const remove = useCallback(
    (name: K, value: string, nav: 'replace' | 'push' = 'replace') => {
      const arr = ((filters[name] as string[]) ?? []).filter((v) => v !== value)
      set(name, arr, nav)
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
