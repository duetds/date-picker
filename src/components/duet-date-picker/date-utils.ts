const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/

export enum DaysOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export class DateInvalidException implements Error {
  constructor(message, name, date) {
    this.message = message
    this.name = name
    this.date = date
  }

  message: string
  name: string
  date: Date
}

export function createDate(year: string, month: string, day: string): Date {
  var dayInt = parseInt(day, 10)
  var monthInt = parseInt(month, 10)
  var yearInt = parseInt(year, 10)

  const isValid =
    Number.isInteger(yearInt) && // all parts should be integers
    Number.isInteger(monthInt) &&
    Number.isInteger(dayInt) &&
    monthInt > 0 && // month must be 1-12
    monthInt <= 12 &&
    dayInt > 0 && // day must be 1-31
    dayInt <= 31 &&
    yearInt > 0

  if (isValid) {
    const date = new Date(yearInt, monthInt - 1, dayInt)

    if (isDateChanged(date, dayInt, monthInt, yearInt)) {
      throw new DateInvalidException("Invalid date", "Invalid date", date)
    }

    return date
  }
}

/**
 *
 * @param date
 * @param day
 * @param month
 * @param year
 */
function isDateChanged(date: Date, day: number, month: number, year: number): boolean {
  if (date.getDate() != day || date.getMonth() + 1 != month || date.getFullYear() != year) {
    return true
  }

  return false
}

/**
 * @param value date string in ISO format YYYY-MM-DD
 */
export function parseISODate(value: string): Date {
  if (!value) {
    return
  }

  const matches = value.match(ISO_DATE_FORMAT)

  if (matches) {
    try {
      return createDate(matches[1], matches[2], matches[3])
    } catch (e) {}
  }
}

/**
 * print date in format YYYY-MM-DD
 * @param date
 */
export function printISODate(date: Date): string {
  if (!date) {
    return ""
  }

  var d = date.getDate().toString(10)
  var m = (date.getMonth() + 1).toString(10)
  var y = date.getFullYear().toString(10)

  // days are not zero-indexed, so pad if less than 10
  if (date.getDate() < 10) {
    d = `0${d}`
  }

  // months *are* zero-indexed, pad if less than 9!
  if (date.getMonth() < 9) {
    m = `0${m}`
  }

  return `${y}-${m}-${d}`
}

/**
 * Compare if two dates are equal in terms of day, month, and year
 */
export function isEqual(a: Date, b: Date): boolean {
  if (a == null || b == null) {
    return false
  }

  return isEqualMonth(a, b) && a.getDate() === b.getDate()
}

/**
 * Compare if two dates are in the same month of the same year.
 */
export function isEqualMonth(a: Date, b: Date): boolean {
  if (a == null || b == null) {
    return false
  }

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export function addDays(date: Date, days: number): Date {
  var d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date)
  d.setMonth(date.getMonth() + months)
  return d
}

export function addYears(date: Date, years: number): Date {
  const d = new Date(date)
  d.setFullYear(date.getFullYear() + years)
  return d
}

export function startOfWeek(date: Date, firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday): Date {
  var d = new Date(date)
  var day = d.getDay()
  var diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek

  d.setDate(d.getDate() - diff)
  return d
}

export function endOfWeek(date: Date, firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday): Date {
  var d = new Date(date)
  var day = d.getDay()
  var diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek)

  d.setDate(d.getDate() + diff)
  return d
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function setMonth(date: Date, month: number): Date {
  const d = new Date(date)
  d.setMonth(month)
  return d
}

export function setYear(date: Date, year: number): Date {
  const d = new Date(date)
  d.setFullYear(year)
  return d
}

/**
 * Check if date is within a min and max
 */
export function inRange(date: Date, min?: Date, max?: Date): boolean {
  return clamp(date, min, max) === date
}

/**
 * Ensures date is within range, returns min or max if out of bounds
 */
export function clamp(date: Date, min?: Date, max?: Date): Date {
  const time = date.getTime()

  if (min && min instanceof Date && time < min.getTime()) {
    return min
  }

  if (max && max instanceof Date && time > max.getTime()) {
    return max
  }

  return date
}

/**
 * given start and end date, return an (inclusive) array of all dates in between
 * @param start
 * @param end
 */
function getDaysInRange(start: Date, end: Date): Date[] {
  const days: Date[] = []
  let current = start

  while (!isEqual(current, end)) {
    days.push(current)
    current = addDays(current, 1)
  }

  days.push(current)

  return days
}

/**
 * given a date, return an array of dates from a calendar perspective
 * @param date
 * @param firstDayOfWeek
 */
export function getViewOfMonth(date: Date, firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday): Date[] {
  const start = startOfWeek(startOfMonth(date), firstDayOfWeek)
  const end = endOfWeek(endOfMonth(date), firstDayOfWeek)

  return getDaysInRange(start, end)
}

/**
 * Form random hash
 */
export function chr4() {
  return Math.random()
    .toString(16)
    .slice(-4)
}

/**
 * Create random identifier with a prefix
 * @param prefix
 */
export function createIdentifier(prefix) {
  return `${prefix}-${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`
}
