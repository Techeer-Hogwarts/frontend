type AddCalendarBtnProps = {
  onClick: () => void
}

type AddCalenderModalProps = {
  handleBack: () => void
  mode: 'create' | 'edit'
  eventId?: number
}
  