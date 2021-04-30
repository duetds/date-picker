import {
  isEqual,
  isEqualMonth,
  addDays,
  addMonths,
  addYears,
  startOfWeek,
  endOfWeek,
  setMonth,
  setYear,
  inRange,
  clamp,
  startOfMonth,
  endOfMonth,
  getViewOfMonth,
  parseISODate,
  printISODate,
  DaysOfWeek,
} from "./date-utils"

describe("duet-date-picker/date-utils", () => {
  describe("parseISODate", () => {
    it("handles falsy values", () => {
      // @ts-ignore
      expect(parseISODate()).toBeUndefined()
      // @ts-ignore
      expect(parseISODate(false)).toBeUndefined()
      // @ts-ignore
      expect(parseISODate("")).toBeUndefined()
      // @ts-ignore
      expect(parseISODate(null)).toBeUndefined()
      // @ts-ignore
      expect(parseISODate(0)).toBeUndefined()
    })

    it("returns undefined for invalid strings", () => {
      // invalid format
      expect(parseISODate("hello world")).toBeUndefined()
      expect(parseISODate("01/01/2020")).toBeUndefined()
      expect(parseISODate("01.01.2020")).toBeUndefined()
      expect(parseISODate("01-01-2020")).toBeUndefined()
      expect(parseISODate("2020/01/01")).toBeUndefined()
      // expect(parseISODate("2020-01-01")).toBeUndefined()
      expect(parseISODate("2020--01--01")).toBeUndefined()
      expect(parseISODate("19-01-01")).toBeUndefined()
      expect(parseISODate("190-01-01")).toBeUndefined()
      expect(parseISODate("2020-000001-000001")).toBeUndefined()
      expect(parseISODate("0xAA-01-01")).toBeUndefined()

      // correct format, but invalid dates
      expect(parseISODate("2020-12-32")).toBeUndefined()
      expect(parseISODate("2020-13-01")).toBeUndefined()
    })

    it("returns a date for valid strings", () => {
      expect(parseISODate("2020-01-01")).toEqual(new Date(2020, 0, 1))
    })
  })

  describe("isEqual", () => {
    it("compares dates", () => {
      expect(isEqual(new Date(2020, 0, 1), new Date(2020, 0, 1))).toBe(true)
      expect(isEqual(new Date(2020, 0, 1), new Date(2020, 0, 2))).toBe(false)

      expect(isEqual(null, new Date(2020, 0, 1))).toBe(false)
      expect(isEqual(new Date(2020, 0, 1), null)).toBe(false)
      expect(isEqual(null, null)).toBe(false)
    })
  })

  describe("isEqualMonth", () => {
    it("compares dates", () => {
      expect(isEqualMonth(new Date(2020, 0, 1), new Date(2020, 0, 1))).toBe(true)
      expect(isEqualMonth(new Date(2020, 0, 1), new Date(2020, 0, 31))).toBe(true)

      expect(isEqualMonth(new Date(2020, 0, 1), new Date(2020, 1, 1))).toBe(false)
      expect(isEqualMonth(new Date(2020, 0, 1), new Date(2021, 0, 1))).toBe(false)

      expect(isEqualMonth(null, new Date(2020, 0, 1))).toBe(false)
      expect(isEqualMonth(new Date(2020, 0, 1), null)).toBe(false)
      expect(isEqualMonth(null, null)).toBe(false)
    })
  })

  describe("printISODate", () => {
    it("should print in format dd.mm.yyyy", () => {
      expect(printISODate(new Date(2020, 0, 1))).toBe("2020-01-01")
      expect(printISODate(new Date(2020, 8, 9))).toBe("2020-09-09")
      expect(printISODate(new Date(2020, 9, 10))).toBe("2020-10-10")
    })

    it("returns empty string for undefined dates", () => {
      expect(printISODate(undefined)).toBe("")
    })
  })

  describe("addDays", () => {
    it("can add days", () => {
      const date = new Date(2020, 0, 30)
      expect(addDays(date, 1)).toEqual(new Date(2020, 0, 31))
      expect(addDays(date, 7)).toEqual(new Date(2020, 1, 6))
      expect(addDays(date, 366)).toEqual(new Date(2021, 0, 30))
    })

    it("can subtract days", () => {
      const date = new Date(2020, 0, 31)
      expect(addDays(date, -1)).toEqual(new Date(2020, 0, 30))
      expect(addDays(date, -2)).toEqual(new Date(2020, 0, 29))
      expect(addDays(date, -7)).toEqual(new Date(2020, 0, 24))
    })
  })

  describe("addMonths", () => {
    it("can add months", () => {
      const date = new Date(2020, 0, 1)
      expect(addMonths(date, 1)).toEqual(new Date(2020, 1, 1))
      expect(addMonths(date, 2)).toEqual(new Date(2020, 2, 1))
      expect(addMonths(date, 12)).toEqual(new Date(2021, 0, 1))
    })

    it("can subtract months", () => {
      const date = new Date(2020, 2, 1)
      expect(addMonths(date, -1)).toEqual(new Date(2020, 1, 1))
      expect(addMonths(date, -2)).toEqual(new Date(2020, 0, 1))
      expect(addMonths(date, -12)).toEqual(new Date(2019, 2, 1))
    })
  })

  describe("addYears", () => {
    it("can add years", () => {
      const date = new Date(2020, 0, 1)
      expect(addYears(date, 1)).toEqual(new Date(2021, 0, 1))
      expect(addYears(date, 10)).toEqual(new Date(2030, 0, 1))
    })

    it("can subtract years", () => {
      const date = new Date(2020, 0, 1)
      expect(addYears(date, -1)).toEqual(new Date(2019, 0, 1))
      expect(addYears(date, -10)).toEqual(new Date(2010, 0, 1))
    })
  })

  describe("startOfWeek", () => {
    it("returns the first day of the week", () => {
      expect(startOfWeek(new Date(2020, 0, 1))).toEqual(new Date(2019, 11, 30))
    })

    it("returns the same date if already start of the week", () => {
      const start = startOfWeek(new Date(2020, 0, 1))
      expect(startOfWeek(start)).toEqual(start)
    })

    it("supports changing the first day of the week", () => {
      expect(startOfWeek(new Date(2020, 0, 1), DaysOfWeek.Sunday)).toEqual(new Date(2019, 11, 29))
    })
  })

  describe("endOfWeek", () => {
    it("returns the first day of the week", () => {
      expect(endOfWeek(new Date(2020, 0, 1))).toEqual(new Date(2020, 0, 5))
    })

    it("returns the same date if already start of the week", () => {
      const end = endOfWeek(new Date(2020, 0, 1))
      expect(endOfWeek(end)).toEqual(end)
    })

    it("supports changing the first day of the week", () => {
      expect(endOfWeek(new Date(2020, 0, 1), DaysOfWeek.Sunday)).toEqual(new Date(2020, 0, 4))
    })
  })

  describe("setMonths", () => {
    it("sets the month and returns a new date", () => {
      const date = new Date(2020, 0, 1)
      const result = setMonth(date, 1)

      expect(result).not.toBe(date)
      expect(result).toEqual(new Date(2020, 1, 1))
    })
  })

  describe("setYears", () => {
    it("sets the year and returns a new date", () => {
      const date = new Date(2020, 0, 1)
      const result = setYear(date, 2021)

      expect(result).not.toBe(date)
      expect(result).toEqual(new Date(2021, 0, 1))
    })
  })

  describe("inRange", () => {
    it("returns false for dates below min", () => {
      const min = new Date(2020, 0, 1)
      const max = new Date(2020, 11, 31)
      const date = new Date(2019, 1, 1)

      expect(inRange(date, min, max)).toBe(false)
    })

    it("returns false for dates above max", () => {
      const min = new Date(2020, 0, 1)
      const max = new Date(2020, 11, 31)
      const date = new Date(2021, 1, 1)

      expect(inRange(date, min, max)).toBe(false)
    })

    it("returns true for dates in range", () => {
      const min = new Date(2020, 0, 1)
      const max = new Date(2020, 11, 31)
      const date = new Date(2020, 1, 1)

      expect(inRange(date, min, max)).toBe(true)
      expect(inRange(min, min, max)).toBe(true)
      expect(inRange(max, min, max)).toBe(true)
    })

    it("supports only specifying a minimum", () => {
      const min = new Date(2020, 0, 1)

      expect(inRange(new Date(2020, 1, 1), min)).toBe(true)
      expect(inRange(min, min)).toBe(true)
      expect(inRange(new Date(2019, 0, 1), min)).toBe(false)
    })

    it("supports only specifying a maximum", () => {
      const max = new Date(2020, 1, 1)

      expect(inRange(new Date(2020, 0, 1), undefined, max)).toBe(true)
      expect(inRange(max, undefined, max)).toBe(true)
      expect(inRange(new Date(2021, 0, 1), undefined, max)).toBe(false)
    })

    it("handles undefined min and max", () => {
      expect(inRange(new Date(2020, 0, 1))).toBe(true)
    })
  })

  describe("clamp", () => {
    it("returns min date for dates below min", () => {
      const min = new Date(2020, 0, 1)
      const max = new Date(2020, 11, 31)
      const date = new Date(2019, 11, 31)

      expect(clamp(date, min, max)).toBe(min)
    })

    it("returns max date for dates above max", () => {
      const min = new Date(2020, 0, 1)
      const max = new Date(2020, 11, 31)
      const date = new Date(2021, 0, 1)

      expect(clamp(date, min, max)).toBe(max)
    })

    it("returns date if in range", () => {
      const min = new Date(2020, 0, 1)
      const max = new Date(2020, 11, 31)
      const date = new Date(2020, 5, 1)

      expect(clamp(date, min, max)).toBe(date)
      expect(clamp(min, min, max)).toBe(min)
      expect(clamp(max, min, max)).toBe(max)
    })

    it("supports only specifying a minimum", () => {
      const min = new Date(2020, 0, 1)
      const date = new Date(2020, 1, 1)

      expect(clamp(date, min)).toBe(date)
      expect(clamp(min, min)).toBe(min)
    })

    it("supports only specifying a maximum", () => {
      const max = new Date(2020, 1, 1)
      const date = new Date(2020, 0, 1)

      expect(clamp(date, undefined, max)).toBe(date)
      expect(clamp(max, undefined, max)).toBe(max)
    })

    it("handles undefined min and max", () => {
      const date = new Date(2020, 0, 1)
      expect(clamp(date)).toBe(date)
    })
  })

  describe("startOfMonth", () => {
    it("returns the first day of the month", () => {
      for (var i = 0; i < 12; i++) {
        var date = new Date(2020, i, 10) // arbitrary day in middle of month
        expect(startOfMonth(date)).toEqual(new Date(2020, i, 1))
      }
    })
  })

  describe("endOfMonth", () => {
    it("returns the last day of the month", () => {
      expect(endOfMonth(new Date(2020, 0, 10))).toEqual(new Date(2020, 0, 31)) // jan
      expect(endOfMonth(new Date(2020, 1, 10))).toEqual(new Date(2020, 1, 29)) // feb (leap year)
      expect(endOfMonth(new Date(2019, 1, 10))).toEqual(new Date(2019, 1, 28)) // feb (regular year)
      expect(endOfMonth(new Date(2020, 2, 10))).toEqual(new Date(2020, 2, 31)) // march
      expect(endOfMonth(new Date(2020, 3, 10))).toEqual(new Date(2020, 3, 30)) // april
      expect(endOfMonth(new Date(2020, 4, 10))).toEqual(new Date(2020, 4, 31)) // may
      expect(endOfMonth(new Date(2020, 5, 10))).toEqual(new Date(2020, 5, 30)) // june
      expect(endOfMonth(new Date(2020, 6, 10))).toEqual(new Date(2020, 6, 31)) // july
      expect(endOfMonth(new Date(2020, 7, 10))).toEqual(new Date(2020, 7, 31)) // august
      expect(endOfMonth(new Date(2020, 8, 10))).toEqual(new Date(2020, 8, 30)) // september
      expect(endOfMonth(new Date(2020, 9, 10))).toEqual(new Date(2020, 9, 31)) // october
      expect(endOfMonth(new Date(2020, 10, 10))).toEqual(new Date(2020, 10, 30)) // november
      expect(endOfMonth(new Date(2020, 11, 10))).toEqual(new Date(2020, 11, 31)) // december
    })
  })

  describe("getViewOfMonth", () => {
    function range(from: number, to: number) {
      var result = []
      for (var i = 0; i <= to - from; i++) {
        result.push(from + i)
      }
      return result
    }

    function assertMonth(days: Date[], expected) {
      expect(days.map(d => d.getDate())).toEqual(expected)
    }

    it("gives a correct view of the month", () => {
      // jan
      assertMonth(getViewOfMonth(new Date(2020, 0, 10)), [30, 31, ...range(1, 31), 1, 2])
      // feb (leap year)
      assertMonth(getViewOfMonth(new Date(2020, 1, 10)), [...range(27, 31), ...range(1, 29), 1])
      // feb (regular year)
      assertMonth(getViewOfMonth(new Date(2019, 1, 10)), [...range(28, 31), ...range(1, 28), ...range(1, 3)])
      //march
      assertMonth(getViewOfMonth(new Date(2020, 2, 10)), [...range(24, 29), ...range(1, 31), ...range(1, 5)])
      // april
      assertMonth(getViewOfMonth(new Date(2020, 3, 10)), [30, 31, ...range(1, 30), ...range(1, 3)])
      // may
      assertMonth(getViewOfMonth(new Date(2020, 4, 10)), [...range(27, 30), ...range(1, 31)])
      // june
      assertMonth(getViewOfMonth(new Date(2020, 5, 10)), [...range(1, 30), ...range(1, 5)])
      // july
      assertMonth(getViewOfMonth(new Date(2020, 6, 10)), [29, 30, ...range(1, 31), 1, 2])
      // august
      assertMonth(getViewOfMonth(new Date(2020, 7, 10)), [...range(27, 31), ...range(1, 31), ...range(1, 6)])
      // september
      assertMonth(getViewOfMonth(new Date(2020, 8, 10)), [31, ...range(1, 30), ...range(1, 4)])
      // october
      assertMonth(getViewOfMonth(new Date(2020, 9, 10)), [...range(28, 30), ...range(1, 31), 1])
      // november
      assertMonth(getViewOfMonth(new Date(2020, 10, 10)), [...range(26, 31), ...range(1, 30), ...range(1, 6)])
      // december
      assertMonth(getViewOfMonth(new Date(2020, 11, 10)), [30, ...range(1, 31), ...range(1, 3)])
    })
  })
})
