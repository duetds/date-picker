import { parseISODate, printISODate } from "./date-utils"

export type DuetDateParser = (input: string) => Date | undefined
export type DuetDateFormatter = (date: Date) => string

export interface DuetDateAdapter {
  parse: DuetDateParser
  format: DuetDateFormatter
}

const isoAdapter: DuetDateAdapter = { parse: parseISODate, format: printISODate }
export default isoAdapter
