type MonthsLabels = [string, string, string, string, string, string, string, string, string, string, string, string]
type DayLabels = [string, string, string, string, string, string, string]

export type DuetLocalisedText = {
  buttonLabel: string
  placeholder: string
  selectedDateMessage: string
  prevMonthLabel: string
  nextMonthLabel: string
  monthSelectLabel: string
  yearSelectLabel: string
  closeLabel: string
  keyboardInstruction: string
  calendarHeading: string
  dayNames: DayLabels
  monthNames: MonthsLabels
  monthNamesShort: MonthsLabels
}

export type DuetDateParser = (input: string) => Date | undefined
export type DuetDateFormatter = (date: Date) => string

export interface DuetDateAdapter {
  parse: DuetDateParser
  format: DuetDateFormatter
}
