import { createPage } from "../../utils/test-utils"
import { E2EPage } from "@stencil/core/testing"
import localization from "./date-localization"

async function getFocusedElement(page: E2EPage) {
  return page.evaluateHandle(() => document.activeElement)
}

async function getChooseDateButton(page: E2EPage) {
  return page.find(".duet-date__toggle")
}

async function getInput(page: E2EPage) {
  return page.find(".duet-date__input")
}

async function getDialog(page: E2EPage) {
  return page.find(`[role="dialog"]`)
}

async function getGrid(page: E2EPage) {
  return page.find(`[role="grid"]`)
}

async function getPicker(page: E2EPage) {
  return page.find("duet-date-picker")
}

async function setMonthDropdown(page: E2EPage, month) {
  await page.select(".duet-date__select--month", month)
  await page.waitForChanges()
}

async function setYearDropdown(page: E2EPage, year) {
  await page.select(".duet-date__select--year", year)
}

async function getPrevMonthButton(page: E2EPage) {
  const dialog = await getDialog(page)
  return dialog.find(`.duet-date__prev`)
}

async function getNextMonthButton(page: E2EPage) {
  const dialog = await getDialog(page)
  return dialog.find(`.duet-date__next`)
}

async function clickDay(page: E2EPage, date: string) {
  const grid = await getGrid(page)
  const button = await grid.find(`button[data-label="${date}"]`)
  await button.click()
  await page.waitForChanges()
}

async function openCalendar(page: E2EPage) {
  const button = await getChooseDateButton(page)
  await button.click()
  await page.waitForChanges()
  const dialog = await getDialog(page)
  await dialog.waitForVisible()
}

async function clickOutside(page: E2EPage) {
  const input = await getInput(page)
  await input.click()
  await page.waitForChanges()
  const dialog = await getDialog(page)
  await dialog.waitForNotVisible()
}

async function isCalendarOpen(page: E2EPage): Promise<boolean> {
  const dialog = await getDialog(page)
  return dialog.isVisible()
}

const generatePage = (props: Partial<HTMLDuetDatePickerElement> = {}) => {
  const attrs = Object.entries(props)
    .map(([attr, value]) => `${attr}="${value}"`)
    .join(" ")

  return createPage(`
    <body style="min-height: 400px">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@duetds/date-picker@latest/dist/duet/themes/default.css" />
      <duet-date-picker ${attrs}></duet-date-picker>
    </body>
  `)
}

const ANIMATION_DELAY = 600

describe("duet-date-picker", () => {
  it("should render a date picker", async () => {
    const page = await createPage(`<duet-date-picker></duet-date-picker>`)
    const component = await getPicker(page)
    expect(component).not.toBeNull()
  })

  describe("mouse interaction", () => {
    it("should open on button click", async () => {
      const page = await generatePage()

      expect(await isCalendarOpen(page)).toBe(false)
      await openCalendar(page)
      expect(await isCalendarOpen(page)).toBe(true)
    })

    it("should close on click outside", async () => {
      const page = await generatePage()

      await openCalendar(page)
      expect(await isCalendarOpen(page)).toBe(true)

      await clickOutside(page)
      expect(await isCalendarOpen(page)).toBe(false)
    })

    it("supports selecting a date in the future", async () => {
      const page = await generatePage({ value: "2020-01-01" })
      await openCalendar(page)

      const picker = await getPicker(page)
      const nextMonth = await getNextMonthButton(page)
      const spy = await picker.spyOnEvent("duetChange")

      await nextMonth.click()
      await nextMonth.click()
      await nextMonth.click()
      await clickDay(page, "2020-04-19")

      expect(spy).toHaveReceivedEventTimes(1)
      expect(spy.lastEvent.detail).toEqual({
        component: "duet-date-picker",
        value: "2020-04-19",
        valueAsDate: new Date(2020, 3, 19).toISOString(),
      })
    })

    it("supports selecting a date in the past", async () => {
      const page = await generatePage({ value: "2020-01-01" })
      await openCalendar(page)

      const picker = await getPicker(page)
      const spy = await picker.spyOnEvent("duetChange")

      await setMonthDropdown(page, "3")
      await setYearDropdown(page, "2019")
      await clickDay(page, "2019-04-19")

      expect(spy).toHaveReceivedEventTimes(1)
      expect(spy.lastEvent.detail).toEqual({
        component: "duet-date-picker",
        value: "2019-04-19",
        valueAsDate: new Date(2019, 3, 19).toISOString(),
      })
    })
  })

  // see: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
  describe("a11y/ARIA requirements", () => {
    describe("button", () => {
      it("has an accessible label", async () => {
        const page = await generatePage()
        const button = await getChooseDateButton(page)
        const element = await button.find(".duet-date__vhidden")
        expect(element).toEqualText(localization.buttonLabel)
      })
    })

    describe("dialog", () => {
      it("meets a11y requirements", async () => {
        const page = await generatePage()
        const dialog = await getDialog(page)

        // has aria-modal attr
        expect(dialog).toBeDefined()
        expect(dialog).toEqualAttribute("aria-modal", "true")

        // has accessible label
        const labelledById = dialog.getAttribute("aria-labelledby")
        const title = await page.find(`#${labelledById}`)
        expect(title).toBeDefined()

        // announces keyboard support
        const instructionText = await dialog.find(".duet-date__instructions")
        expect(instructionText).toEqualText(localization.keyboardInstruction)
      })
    })

    describe("grid", () => {
      it("meets a11y requirements", async () => {
        const page = await generatePage({ value: "2020-01-01" })
        const grid = await getGrid(page)

        // has accessible label
        const labelledById = await grid.getAttribute("aria-labelledby")
        const title = await page.find(`#${labelledById}`)
        expect(title).toBeDefined()

        await openCalendar(page)

        // only one button in focus order, has accessible label, and correct text content
        const selected = await grid.findAll(`[tabindex="0"]`)
        expect(selected.length).toBe(1)
        expect(selected[0].getAttribute("aria-selected")).toBe("true")
        expect(selected[0].innerText).toContain("2020-01-01")
      })

      it.todo("correctly abbreviates the shortened day names")
    })

    describe("controls", () => {
      it.todo("has a label for next month button")
      it.todo("has a label for previous month button")
      it.todo("has a label for the month select dropdown")
      it.todo("has a label for the year select dropdown")
    })
  })

  describe("keyboard a11y", () => {
    it("closes on ESC press", async () => {
      const page = await generatePage()
      await openCalendar(page)

      expect(await isCalendarOpen(page)).toBe(true)

      await page.waitFor(ANIMATION_DELAY)
      await page.keyboard.press("Escape")
      await page.waitFor(ANIMATION_DELAY)

      expect(await isCalendarOpen(page)).toBe(false)
    })

    it("supports selecting a date in the future", async () => {
      const page = await generatePage({ value: "2020-01-01" })
      const picker = await getPicker(page)
      const spy = await picker.spyOnEvent("duetChange")

      // open calendar
      await page.keyboard.press("Tab")
      await page.waitForChanges()
      await page.keyboard.press("Tab")
      await page.waitForChanges()
      await page.keyboard.press("Enter")
      await page.waitForChanges()

      // wait for calendar to open
      await page.waitFor(ANIMATION_DELAY)

      // set month to april
      await setMonthDropdown(page, "3")

      // tab to grid
      await page.keyboard.press("Tab")
      await page.waitForChanges()
      await page.keyboard.press("Tab")
      await page.waitForChanges()
      await page.keyboard.press("Tab")
      await page.waitForChanges()
      await page.keyboard.press("Tab")
      await page.waitForChanges()

      // tab to grid, select 19th of month
      await page.keyboard.press("ArrowDown")
      await page.waitForChanges()
      await page.keyboard.press("ArrowDown")
      await page.waitForChanges()
      await page.keyboard.press("ArrowRight")
      await page.waitForChanges()
      await page.keyboard.press("ArrowRight")
      await page.waitForChanges()
      await page.keyboard.press("ArrowRight")
      await page.waitForChanges()
      await page.keyboard.press("ArrowRight")
      await page.waitForChanges()
      await page.keyboard.press("Enter")
      await page.waitForChanges()

      expect(spy).toHaveReceivedEventTimes(1)
      expect(spy.lastEvent.detail).toEqual({
        component: "duet-date-picker",
        value: "2020-04-19",
        valueAsDate: new Date(2020, 3, 19).toISOString(),
      })
    })

    it("supports selecting a date in the past", async () => {
      const page = await generatePage({ value: "2020-01-01" })
      const picker = await getPicker(page)
      const spy = await picker.spyOnEvent("duetChange")

      // open calendar
      await page.keyboard.press("Tab")
      await page.waitForChanges()
      await page.keyboard.press("Tab")
      await page.waitForChanges()
      await page.keyboard.press("Enter")
      await page.waitForChanges()

      // wait for calendar to open
      await page.waitFor(ANIMATION_DELAY)

      // select april from month dropdown
      await setMonthDropdown(page, "3")

      // tab to year dropdown, select 2019
      await page.keyboard.press("Tab")
      await setYearDropdown(page, "2019")

      // tab to grid
      await page.keyboard.press("Tab")
      await page.keyboard.press("Tab")
      await page.keyboard.press("Tab")

      // select date 19th of month
      await page.keyboard.press("ArrowDown")
      await page.waitForChanges()
      await page.keyboard.press("ArrowDown")
      await page.waitForChanges()
      await page.keyboard.press("ArrowRight")
      await page.waitForChanges()
      await page.keyboard.press("ArrowRight")
      await page.waitForChanges()
      await page.keyboard.press("ArrowRight")
      await page.waitForChanges()
      await page.keyboard.press("ArrowRight")
      await page.waitForChanges()
      await page.keyboard.press("Enter")
      await page.waitForChanges()

      expect(spy).toHaveReceivedEventTimes(1)
      expect(spy.lastEvent.detail).toEqual({
        component: "duet-date-picker",
        value: "2019-04-19",
        valueAsDate: new Date(2019, 3, 19).toISOString(),
      })
    })

    it.todo("moves focus to start of week on home press")
    it.todo("moves focus to end of week end press")

    it.todo("moves focus to previous month on page up press")
    it.todo("moves focus to next month on page down press")

    it.todo("moves focus to previous year on shift + page down press")
    it.todo("moves focus to next year on shift + page down press")
  })

  describe("events", () => {
    it("raises a duetBlur event when the input is blurred", async () => {
      const page = await generatePage()
      const picker = await page.find("duet-date-picker")
      const spy = await picker.spyOnEvent("duetBlur")

      await page.keyboard.press("Tab")
      await page.keyboard.press("Tab")
      expect(spy).toHaveReceivedEventTimes(1)
    })

    it("raises a duetFocus event when the input is focused", async () => {
      const page = await generatePage()
      const picker = await page.find("duet-date-picker")
      const spy = await picker.spyOnEvent("duetFocus")

      await page.keyboard.press("Tab")

      expect(spy).toHaveReceivedEventTimes(1)
    })
  })

  describe("focus management", () => {
    it("traps focus in calendar", async () => {
      const page = await generatePage()

      await openCalendar(page)

      // wait for calendar to open
      await page.waitFor(ANIMATION_DELAY)

      // month dropdown
      let focused = await getFocusedElement(page)
      let id = await page.evaluate(element => element.id, focused)
      let label = await page.find(`label[for="${id}"]`)
      expect(label).toEqualText(localization.monthSelectLabel)

      // year dropdown
      await page.keyboard.press("Tab")
      focused = await getFocusedElement(page)
      id = await page.evaluate(element => element.id, focused)
      label = await page.find(`label[for="${id}"]`)
      expect(label).toEqualText(localization.yearSelectLabel)

      // prev month
      await page.keyboard.press("Tab")
      focused = await getFocusedElement(page)
      let ariaLabel = await page.evaluate(element => element.innerText, focused)
      expect(ariaLabel).toEqual(localization.prevMonthLabel)

      // next month
      await page.keyboard.press("Tab")
      focused = await getFocusedElement(page)
      ariaLabel = await page.evaluate(element => element.innerText, focused)
      expect(ariaLabel).toBe(localization.nextMonthLabel)

      // day
      await page.keyboard.press("Tab")
      focused = await getFocusedElement(page)
      const tabIndex = await page.evaluate(element => element.tabIndex, focused)
      expect(tabIndex).toBe(0)

      // close button
      await page.keyboard.press("Tab")
      focused = await getFocusedElement(page)
      ariaLabel = await page.evaluate(element => element.innerText, focused)
      expect(ariaLabel).toBe(localization.closeLabel)

      // back to month
      await page.keyboard.press("Tab")
      focused = await getFocusedElement(page)
      id = await page.evaluate(element => element.id, focused)
      label = await page.find(`label[for="${id}"]`)
      expect(label).toEqualText(localization.monthSelectLabel)
    })

    it.todo("doesn't shift focus when interacting with calendar navigation controls")
    it.todo("shifts focus back to button on date select")
    it.todo("shifts focus back to button on ESC press")
    it.todo("doesn't shift focus to button on click outside")
  })

  describe("min/max support", () => {
    it("supports a min date", async () => {
      const page = await generatePage({ value: "2020-01-15", min: "2020-01-02" })
      const picker = await getPicker(page)
      const spy = await picker.spyOnEvent("duetChange")

      await openCalendar(page)

      // wait for calendar to open
      await page.waitFor(ANIMATION_DELAY)

      // make sure it's rendered correctly
      // We use a slightly higher threshold here since the CSS transition
      // makes certain parts move slightly depending on how the browser converts
      // the percentage based units into pixels.
      const screenshot = await page.screenshot()
      expect(screenshot).toMatchImageSnapshot({
        failureThreshold: 0.001,
        failureThresholdType: "percent",
      })

      // try clicking a day outside the range
      await clickDay(page, "2020-01-01")
      expect(spy).toHaveReceivedEventTimes(0)

      // click a day inside the range
      await clickDay(page, "2020-01-02")

      expect(spy).toHaveReceivedEventTimes(1)
      expect(spy.lastEvent.detail).toEqual({
        component: "duet-date-picker",
        value: "2020-01-02",
        valueAsDate: new Date(2020, 0, 2).toISOString(),
      })
    })

    it("supports a max date", async () => {
      const page = await generatePage({ value: "2020-01-15", max: "2020-01-30" })
      const picker = await getPicker(page)
      const spy = await picker.spyOnEvent("duetChange")

      await openCalendar(page)

      // wait for calendar to open
      await page.waitFor(ANIMATION_DELAY)

      // make sure it's rendered correctly
      // We use a slightly higher threshold here since the CSS transition
      // makes certain parts move slightly depending on how the browser converts
      // the percentage based units into pixels.
      const screenshot = await page.screenshot()
      expect(screenshot).toMatchImageSnapshot({
        failureThreshold: 0.001,
        failureThresholdType: "percent",
      })

      // try clicking a day outside the range
      await clickDay(page, "2020-01-31")
      expect(spy).toHaveReceivedEventTimes(0)

      // click a day inside the range
      await clickDay(page, "2020-01-30")

      expect(spy).toHaveReceivedEventTimes(1)
      expect(spy.lastEvent.detail).toEqual({
        component: "duet-date-picker",
        value: "2020-01-30",
        valueAsDate: new Date(2020, 0, 30).toISOString(),
      })
    })

    it("supports min and max dates", async () => {
      const page = await generatePage({ value: "2020-01-15", min: "2020-01-02", max: "2020-01-30" })
      const picker = await getPicker(page)
      const spy = await picker.spyOnEvent("duetChange")

      await openCalendar(page)

      // wait for calendar to open
      await page.waitFor(ANIMATION_DELAY)

      // make sure it's rendered correctly.
      // We use a slightly higher threshold here since the CSS transition
      // makes certain parts move slightly depending on how the browser converts
      // the percentage based units into pixels.
      const screenshot = await page.screenshot()
      expect(screenshot).toMatchImageSnapshot({
        failureThreshold: 0.001,
        failureThresholdType: "percent",
      })

      // try clicking a day less than min
      await clickDay(page, "2020-01-01")
      expect(spy).toHaveReceivedEventTimes(0)

      // try clicking a day greater than max
      await clickDay(page, "2020-01-31")
      expect(spy).toHaveReceivedEventTimes(0)

      // click a day inside the range
      await clickDay(page, "2020-01-30")

      expect(spy).toHaveReceivedEventTimes(1)
      expect(spy.lastEvent.detail).toEqual({
        component: "duet-date-picker",
        value: "2020-01-30",
        valueAsDate: new Date(2020, 0, 30).toISOString(),
      })
    })

    it("disables prev month button if same month and year as min", async () => {
      const page = await generatePage({ value: "2020-04-19", min: "2020-04-01" })

      await openCalendar(page)

      const prevMonthButton = await getPrevMonthButton(page)
      expect(prevMonthButton).toHaveAttribute("disabled")
    })

    it("disables next month button if same month and year as max", async () => {
      const page = await generatePage({ value: "2020-04-19", max: "2020-04-30" })

      await openCalendar(page)

      const nextMonthButton = await getNextMonthButton(page)
      expect(nextMonthButton).toHaveAttribute("disabled")
    })

    it("does not disable prev/next buttons when only month value (but not year) is same as min and max", async () => {
      // there was a bug whereby both buttons would be disabled if the min/max/selected date
      // had the same month (here: 4), but different years. this tests ensures no regression
      const page = await generatePage({ value: "2020-04-19", min: "2019-04-19", max: "2021-04-19" })

      await openCalendar(page)

      const prevMonthButton = await getPrevMonthButton(page)
      const nextMonthButton = await getNextMonthButton(page)

      expect(prevMonthButton).not.toHaveAttribute("disabled")
      expect(nextMonthButton).not.toHaveAttribute("disabled")
    })
  })

  describe("methods", () => {
    it("should open calendar on show()", async () => {
      const page = await generatePage()
      const picker = await page.find("duet-date-picker")

      expect(await isCalendarOpen(page)).toBe(false)

      await picker.callMethod("show")
      await page.waitForChanges()

      expect(await isCalendarOpen(page)).toBe(true)
    })

    it("should close calendar on hide()", async () => {
      const page = await generatePage()
      const picker = await page.find("duet-date-picker")

      await picker.callMethod("show")
      await page.waitForChanges()
      expect(await isCalendarOpen(page)).toBe(true)

      await picker.callMethod("hide")
      await page.waitForChanges()

      const dialog = await getDialog(page)
      await dialog.waitForNotVisible()

      expect(await isCalendarOpen(page)).toBe(false)
    })

    it("should focus input on setFocus()", async () => {
      const page = await generatePage()
      const picker = await page.find("duet-date-picker")

      await picker.callMethod("setFocus")
      await page.waitForChanges()

      const focused = await getFocusedElement(page)
      const tagName = await page.evaluate(element => element.tagName, focused)

      expect(tagName.toLowerCase()).toEqualText("input")
    })
  })
})
