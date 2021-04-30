import { parseISODate, printISODate, createDate } from "./date-utils"

type CreateDate = typeof createDate
export type DuetDateParser = (input: string, createDate: CreateDate) => Date | undefined
export type DuetDateFormatter = (date: Date) => string

export interface DuetDateAdapter {
  parse: DuetDateParser
  format: DuetDateFormatter
  isDateDisabled?: (date: Date, focusedDate: Date) => boolean
}

const isoAdapter: DuetDateAdapter = { parse: parseISODate, format: printISODate }
export default isoAdapter
