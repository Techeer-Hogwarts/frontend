import CalendarClient from '@/components/calender/CalendarClient'
import { CATEGORIES } from '@/constants/category'

export default function Page() {
  const defaultSelectCategories = CATEGORIES.map((c) => c.value)

  return (
    <CalendarClient
      CATEGORIES={CATEGORIES}
      defaultSelectCategories={defaultSelectCategories}
    />
  )
}
