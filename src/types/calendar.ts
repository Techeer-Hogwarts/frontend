export type AddCalendarBtnProps = {
  onClick: () => void
}

export type AddCalendarModalProps = {
  handleBack: () => void
  mode: 'create' | 'edit'
  eventId?: number
}

export type Category = {
  title: string
  value: string
}

export type CalendarClientProps = {
  CATEGORIES: Category[]
  defaultSelectCategories: string[]
}
