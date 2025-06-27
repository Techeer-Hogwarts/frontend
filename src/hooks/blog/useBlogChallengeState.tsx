'use client'
import { useState } from 'react'

export function useBlogChallengeState() {
  const [terms, setTerms] = useState([])
  const [yearOptions, setYearOptions] = useState([])
  const [timeOptions, setTimeOptions] = useState([])
  const [selectedYear, setSelectedYear] = useState([])
  const [selectedTime, setSelectedTime] = useState([])
  const [selectedSort, setSelectedSort] = useState(['최신순'])
  const [selectedTermId, setSelectedTermId] = useState(null)

  return {
    terms,
    setTerms,
    yearOptions,
    setYearOptions,
    timeOptions,
    setTimeOptions,
    selectedYear,
    setSelectedYear,
    selectedTime,
    setSelectedTime,
    selectedSort,
    setSelectedSort,
    selectedTermId,
    setSelectedTermId,
  }
}
