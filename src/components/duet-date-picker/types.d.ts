type MonthsLabels = [string, string, string, string, string, string, string, string, string, string, string, string]
type DayLabels = [string, string, string, string, string, string, string]

export type DuetLocalisedText = {
  buttonLabel: string
  nextMonthLabel: string
  prevMonthLabel: string
  monthSelectLabel: string
  yearSelectLabel: string
  keyboardInstruction: string
  closeLabel: string
  dayLabels: DayLabels
  selected: string
  placeholder: string
  calendarHeading: string
  monthLabels: MonthsLabels
  monthLabelsShort: MonthsLabels
}

export type DuetDateParser = (input: string) => Date | undefined
export type DuetDateFormatter = (date: Date) => string

export interface DuetDateAdapter {
  parse: DuetDateParser
  format: DuetDateFormatter
}
