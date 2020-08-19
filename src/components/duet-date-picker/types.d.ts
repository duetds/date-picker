type MonthsNames = [string, string, string, string, string, string, string, string, string, string, string, string]
type DayNames = [string, string, string, string, string, string, string]

export type DuetLocalizedText = {
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
  dayNames: DayNames
  monthNames: MonthsNames
  monthNamesShort: MonthsNames
}

export type DuetDateParser = (input: string) => Date | undefined
export type DuetDateFormatter = (date: Date) => string

export interface DuetDateAdapter {
  parse: DuetDateParser
  format: DuetDateFormatter
}
