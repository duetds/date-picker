// import { createPage } from "../../utils/test-utils"
// import { E2EElement, E2EPage } from "@stencil/core/testing"
// import localization from "./date-localization"

// async function getFocusedElement(page: E2EPage) {
//   return page.evaluateHandle(() => document.activeElement)
// }

// async function getChooseDateButton(page: E2EPage) {
//   return page.find(".duet-date__toggle")
// }

// async function getInput(page: E2EPage) {
//   return page.find(".duet-date__input")
// }

// async function getDialog(page: E2EPage) {
//   return page.find(`[role="dialog"]`)
// }

// async function getGrid(page: E2EPage) {
//   const dialog = await getDialog(page)
//   return dialog.find("table")
// }

// async function getPicker(page: E2EPage) {
//   return page.find("duet-date-picker")
// }

// async function setMonthDropdown(page: E2EPage, month: string) {
//   await page.select(".duet-date__select--month", month)
//   //await page.waitForTimeoutChanges()
// }

// async function setYearDropdown(page: E2EPage, year: string) {
//   await page.select(".duet-date__select--year", year)
//   //await page.waitForTimeoutChanges()
// }

// async function getPrevMonthButton(page: E2EPage) {
//   const dialog = await getDialog(page)
//   return dialog.find(`.duet-date__prev`)
// }

// async function getNextMonthButton(page: E2EPage) {
//   const dialog = await getDialog(page)
//   return dialog.find(`.duet-date__next`)
// }

// async function findByText(context: E2EPage | E2EElement, selector: string, text: string) {
//   const elements = await context.findAll(selector)
//   return elements.find(element => element.innerText.includes(text))
// }

// async function clickDay(page: E2EPage, date: string) {
//   const grid = await getGrid(page)
//   const button = await findByText(grid, "button", date)
//   await button.click()
//   //await page.waitForTimeoutChanges()
// }

// async function openCalendar(page: E2EPage) {
//   const button = await getChooseDateButton(page)
//   await button.click()
//   //await page.waitForTimeoutChanges()
//   const dialog = await getDialog(page)
//   await dialog.waitForTimeoutVisible()
// }

// async function clickOutside(page: E2EPage) {
//   const input = await getInput(page)
//   await input.click()
//   //await page.waitForTimeoutChanges()
//   const dialog = await getDialog(page)
//   //await dialog.waitForTimeoutNotVisible()
// }

// async function isCalendarOpen(page: E2EPage): Promise<boolean> {
//   const dialog = await getDialog(page)
//   return dialog.isVisible()
// }

// async function getYearOptions(page: E2EPage) {
//   return page.$eval(".duet-date__select--year", (select: HTMLSelectElement) => {
//     return Array.from(select.options).map(option => option.value)
//   })
// }

// const generatePage = (props: Partial<HTMLDuetDatePickerElement> = {}) => {
//   const attrs = Object.entries(props)
//     .map(([attr, value]) => `${attr}="${value}"`)
//     .join(" ")

//   return createPage(`
//     <body style="min-height: 400px">
//       <style>
//         :root {
//           --duet-color-primary: #005fcc;
//           --duet-color-text: #333;
//           --duet-color-text-active: #fff;
//           --duet-color-placeholder: #666;
//           --duet-color-button: #f5f5f5;
//           --duet-color-surface: #fff;
//           --duet-color-overlay: rgba(0, 0, 0, 0.8);
//           --duet-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
//           --duet-font-normal: 400;
//           --duet-font-bold: 600;
//           --duet-radius: 4px;
//           --duet-z-index: 600;
//         }
//       </style>
//       <duet-date-picker ${attrs}></duet-date-picker>
//     </body>
//   `)
// }

// const ANIMATION_DELAY = 600

// describe("duet-date-picker", () => {
//   it("should render a date picker", async () => {
//     const page = await generatePage()
//     const component = await getPicker(page)
//     expect(component).not.toBeNull()
//   })

//   describe("mouse interaction", () => {
//     it("should open on button click", async () => {
//       const page = await generatePage()

//       expect(await isCalendarOpen(page)).toBe(false)
//       await openCalendar(page)
//       expect(await isCalendarOpen(page)).toBe(true)
//     })

//     it("should close on click outside", async () => {
//       const page = await generatePage()

//       await openCalendar(page)
//       expect(await isCalendarOpen(page)).toBe(true)

//       await clickOutside(page)
//       expect(await isCalendarOpen(page)).toBe(false)
//     })

//     it("supports selecting a date in the future", async () => {
//       const page = await generatePage({ value: "2020-01-01" })
//       await openCalendar(page)

//       const picker = await getPicker(page)
//       const nextMonth = await getNextMonthButton(page)
//       const spy = await picker.spyOnEvent("duetChange")

//       await nextMonth.click()
//       await nextMonth.click()
//       await nextMonth.click()
//       await clickDay(page, "19 April")

//       expect(spy).toHaveReceivedEventTimes(1)
//       expect(spy.lastEvent.detail).toEqual({
//         component: "duet-date-picker",
//         value: "2020-04-19",
//         valueAsDate: new Date(2020, 3, 19).toISOString(),
//       })
//     })

//     it("supports selecting a date in the past", async () => {
//       const page = await generatePage({ value: "2020-01-01" })
//       await openCalendar(page)

//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetChange")

//       await setMonthDropdown(page, "3")
//       await setYearDropdown(page, "2019")
//       await clickDay(page, "19 April")

//       expect(spy).toHaveReceivedEventTimes(1)
//       expect(spy.lastEvent.detail).toEqual({
//         component: "duet-date-picker",
//         value: "2019-04-19",
//         valueAsDate: new Date(2019, 3, 19).toISOString(),
//       })
//     })
//   })

//   // see: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
//   describe("a11y/ARIA requirements", () => {
//     describe("button", () => {
//       it("has an accessible label", async () => {
//         const page = await generatePage()
//         const button = await getChooseDateButton(page)
//         const element = await button.find(".duet-date__vhidden")
//         expect(element).toEqualText(localization.buttonLabel)
//       })
//     })

//     describe("dialog", () => {
//       it("meets a11y requirements", async () => {
//         const page = await generatePage()
//         const dialog = await getDialog(page)

//         // has aria-modal attr
//         expect(dialog).toBeDefined()
//         expect(dialog).toEqualAttribute("aria-modal", "true")

//         // has accessible label
//         const labelledById = dialog.getAttribute("aria-labelledby")
//         const title = await page.find(`#${labelledById}`)
//         expect(title).toBeDefined()
//       })
//     })

//     describe("grid", () => {
//       it("meets a11y requirements", async () => {
//         const page = await generatePage({ value: "2020-01-01" })
//         const grid = await getGrid(page)

//         // has accessible label
//         const labelledById = await grid.getAttribute("aria-labelledby")
//         const title = await page.find(`#${labelledById}`)
//         expect(title).toBeDefined()

//         await openCalendar(page)

//         // should be single selected element
//         const selected = await grid.findAll(`[aria-pressed="true"]`)
//         expect(selected.length).toBe(1)

//         // only one button is in focus order, has accessible label, and correct text content
//         expect(selected[0]).toEqualAttribute("tabindex", "0")
//         expect(selected[0].innerText).toContain("1 January")
//       })

//       it.todo("correctly abbreviates the shortened day names")
//     })

//     describe("controls", () => {
//       it.todo("has a label for next month button")
//       it.todo("has a label for previous month button")
//       it.todo("has a label for the month select dropdown")
//       it.todo("has a label for the year select dropdown")
//     })
//   })

//   describe("keyboard a11y", () => {
//     it("closes on ESC press", async () => {
//       const page = await generatePage()
//       await openCalendar(page)

//       expect(await isCalendarOpen(page)).toBe(true)

//       await page.waitForTimeoutTimeout(ANIMATION_DELAY)
//       await page.keyboard.press("Escape")
//       await page.waitForTimeoutTimeout(ANIMATION_DELAY)

//       expect(await isCalendarOpen(page)).toBe(false)
//     })

//     it("supports selecting a date in the future", async () => {
//       const page = await generatePage({ value: "2020-01-01" })
//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetChange")

//       // open calendar
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Enter")
//       //await page.waitForTimeoutChanges()

//       // wait for calendar to open
//       await page.waitForTimeoutTimeout(ANIMATION_DELAY)

//       // set month to april
//       await setMonthDropdown(page, "3")

//       // tab to grid
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()

//       // tab to grid, select 19th of month
//       await page.keyboard.press("ArrowDown")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowDown")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Enter")
//       //await page.waitForTimeoutChanges()

//       expect(spy).toHaveReceivedEventTimes(1)
//       expect(spy.lastEvent.detail).toEqual({
//         component: "duet-date-picker",
//         value: "2020-04-19",
//         valueAsDate: new Date(2020, 3, 19).toISOString(),
//       })
//     })

//     it("supports selecting a date in the past", async () => {
//       const page = await generatePage({ value: "2020-01-01" })
//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetChange")

//       // open calendar
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Enter")
//       //await page.waitForTimeoutChanges()

//       // wait for calendar to open
//       await page.waitForTimeoutTimeout(ANIMATION_DELAY)

//       // select april from month dropdown
//       await setMonthDropdown(page, "3")

//       // tab to year dropdown, select 2019
//       await page.keyboard.press("Tab")
//       await setYearDropdown(page, "2019")

//       // tab to grid
//       await page.keyboard.press("Tab")
//       await page.keyboard.press("Tab")
//       await page.keyboard.press("Tab")

//       // select date 19th of month
//       await page.keyboard.press("ArrowDown")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowDown")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Enter")
//       //await page.waitForTimeoutChanges()

//       expect(spy).toHaveReceivedEventTimes(1)
//       expect(spy.lastEvent.detail).toEqual({
//         component: "duet-date-picker",
//         value: "2019-04-19",
//         valueAsDate: new Date(2019, 3, 19).toISOString(),
//       })
//     })

//     it("supports navigating to disabled dates", async () => {
//       const page = await generatePage({ value: "2020-01-01" })

//       // disable weekends
//       await page.$eval("duet-date-picker", async (picker: HTMLDuetDatePickerElement) => {
//         picker.isDateDisabled = function isWeekend(date) {
//           return date.getDay() === 0 || date.getDay() === 6
//         }
//       })

//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetChange")

//       // open calendar
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Enter")
//       //await page.waitForTimeoutChanges()

//       // wait for calendar to open
//       await page.waitForTimeoutTimeout(ANIMATION_DELAY)

//       // set month to april
//       await setMonthDropdown(page, "3")

//       // tab to grid
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()
//       await page.keyboard.press("Tab")
//       //await page.waitForTimeoutChanges()

//       // navigate to 2. april thursday
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       // navigate to 3. april friday
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()
//       // navigate to 4. april saturday
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()

//       await page.keyboard.press("Enter")
//       //await page.waitForTimeoutChanges()
//       expect(spy).toHaveReceivedEventTimes(0)

//       // navigate to 5. april sunday
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()

//       await page.keyboard.press("Enter")
//       //await page.waitForTimeoutChanges()
//       expect(spy).toHaveReceivedEventTimes(0)

//       // navigate to 6. april monday
//       await page.keyboard.press("ArrowRight")
//       //await page.waitForTimeoutChanges()

//       await page.keyboard.press("Enter")
//       //await page.waitForTimeoutChanges()

//       expect(spy).toHaveReceivedEventTimes(1)
//       expect(spy.lastEvent.detail).toEqual({
//         component: "duet-date-picker",
//         value: "2020-04-06",
//         valueAsDate: new Date(2020, 3, 6).toISOString(),
//       })
//     })

//     it.todo("moves focus to start of week on home press")
//     it.todo("moves focus to end of week end press")

//     it.todo("moves focus to previous month on page up press")
//     it.todo("moves focus to next month on page down press")

//     it.todo("moves focus to previous year on shift + page down press")
//     it.todo("moves focus to next year on shift + page down press")

//     it("maintains curosor position when typing disallowed characters", async () => {
//       const page = await generatePage()
//       const element = await getPicker(page)
//       const input = await getInput(page)
//       const DATE = "2020-03-19"

//       // tab to input
//       await page.keyboard.press("Tab")

//       // type some _allowed_ chars
//       await page.keyboard.type(DATE, { delay: 50 })

//       // move cursor so we can test maintaining position
//       await page.keyboard.press("ArrowLeft")

//       // store cursor position
//       const cursorBefore = await input.getProperty("selectionStart")
//       expect(cursorBefore).toBe(DATE.length - 1)

//       // attempt to enter _disallowed_ character
//       await page.keyboard.press("a")

//       const cursorAfter = await input.getProperty("selectionStart")
//       const value = await element.getProperty("value")

//       // we should see cursor hasn't changed
//       expect(cursorAfter).toBe(cursorBefore)

//       // and value contains no disallowed chars
//       expect(value).toBe(DATE)
//     })
//   })

//   describe("events", () => {
//     it("raises a duetBlur event when the input is blurred", async () => {
//       const page = await generatePage()
//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetBlur")

//       await page.keyboard.press("Tab")
//       await page.keyboard.press("Tab")
//       expect(spy).toHaveReceivedEventTimes(1)
//     })

//     it("raises a duetFocus event when the input is focused", async () => {
//       const page = await generatePage()
//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetFocus")

//       await page.keyboard.press("Tab")

//       expect(spy).toHaveReceivedEventTimes(1)
//     })

//     it("raises a duetOpen event on open", async () => {
//       const page = await generatePage()
//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetOpen")

//       await picker.callMethod("show")
//       expect(spy).toHaveReceivedEventTimes(1)
//     })

//     it("raises a duetClose event on close", async () => {
//       const page = await generatePage()
//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetClose")

//       await picker.callMethod("hide")
//       expect(spy).toHaveReceivedEventTimes(1)
//     })
//   })

//   describe("focus management", () => {
//     it("traps focus in calendar", async () => {
//       const page = await generatePage()

//       await openCalendar(page)

//       // wait for calendar to open
//       await page.waitForTimeout(ANIMATION_DELAY)

//       // month dropdown
//       let focused = await getFocusedElement(page)
//       let id = await page.evaluate(element => element.id, focused)
//       let label = await page.find(`label[for="${id}"]`)
//       expect(label).toEqualText(localization.monthSelectLabel)

//       // year dropdown
//       await page.keyboard.press("Tab")
//       focused = await getFocusedElement(page)
//       id = await page.evaluate(element => element.id, focused)
//       label = await page.find(`label[for="${id}"]`)
//       expect(label).toEqualText(localization.yearSelectLabel)

//       // prev month
//       await page.keyboard.press("Tab")
//       focused = await getFocusedElement(page)
//       let ariaLabel = await page.evaluate((element: HTMLElement) => element.innerText, focused)
//       expect(ariaLabel).toEqual(localization.prevMonthLabel)

//       // next month
//       await page.keyboard.press("Tab")
//       focused = await getFocusedElement(page)
//       ariaLabel = await page.evaluate((element: HTMLElement) => element.innerText, focused)
//       expect(ariaLabel).toBe(localization.nextMonthLabel)

//       // day
//       await page.keyboard.press("Tab")
//       focused = await getFocusedElement(page)
//       const tabIndex = await page.evaluate((element: HTMLElement) => element.tabIndex, focused)
//       expect(tabIndex).toBe(0)

//       // close button
//       await page.keyboard.press("Tab")
//       focused = await getFocusedElement(page)
//       ariaLabel = await page.evaluate((element: HTMLElement) => element.innerText, focused)
//       expect(ariaLabel).toBe(localization.closeLabel)

//       // back to month
//       await page.keyboard.press("Tab")
//       focused = await getFocusedElement(page)
//       id = await page.evaluate(element => element.id, focused)
//       label = await page.find(`label[for="${id}"]`)
//       expect(label).toEqualText(localization.monthSelectLabel)
//     })

//     it.todo("doesn't shift focus when interacting with calendar navigation controls")
//     it.todo("shifts focus back to button on date select")
//     it.todo("shifts focus back to button on ESC press")
//     it.todo("doesn't shift focus to button on click outside")
//   })

//   describe("min/max support", () => {
//     it("supports a min date", async () => {
//       const page = await generatePage({ value: "2020-01-15", min: "2020-01-02" })
//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetChange")

//       await openCalendar(page)

//       // wait for calendar to open
//       await page.waitForTimeout(ANIMATION_DELAY)

//       // make sure it's rendered correctly
//       // We use a slightly higher threshold here since the CSS transition
//       // makes certain parts move slightly depending on how the browser converts
//       // the percentage based units into pixels.
//       const screenshot = await page.screenshot()
//       expect(screenshot).toMatchImageSnapshot({
//         failureThreshold: 0.001,
//         failureThresholdType: "percent",
//       })

//       // try clicking a day outside the range
//       await clickDay(page, "1 January")
//       expect(spy).toHaveReceivedEventTimes(0)

//       // click a day inside the range
//       await clickDay(page, "2 January")

//       expect(spy).toHaveReceivedEventTimes(1)
//       expect(spy.lastEvent.detail).toEqual({
//         component: "duet-date-picker",
//         value: "2020-01-02",
//         valueAsDate: new Date(2020, 0, 2).toISOString(),
//       })
//     })

//     it("supports a max date", async () => {
//       const page = await generatePage({ value: "2020-01-15", max: "2020-01-30" })
//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetChange")

//       await openCalendar(page)

//       // wait for calendar to open
//       await page.waitForTimeout(ANIMATION_DELAY)

//       // make sure it's rendered correctly
//       // We use a slightly higher threshold here since the CSS transition
//       // makes certain parts move slightly depending on how the browser converts
//       // the percentage based units into pixels.
//       const screenshot = await page.screenshot()
//       expect(screenshot).toMatchImageSnapshot({
//         failureThreshold: 0.001,
//         failureThresholdType: "percent",
//       })

//       // try clicking a day outside the range
//       await clickDay(page, "31 January")
//       expect(spy).toHaveReceivedEventTimes(0)

//       // click a day inside the range
//       await clickDay(page, "30 January")

//       expect(spy).toHaveReceivedEventTimes(1)
//       expect(spy.lastEvent.detail).toEqual({
//         component: "duet-date-picker",
//         value: "2020-01-30",
//         valueAsDate: new Date(2020, 0, 30).toISOString(),
//       })
//     })

//     it("supports min and max dates", async () => {
//       const page = await generatePage({ value: "2020-01-15", min: "2020-01-02", max: "2020-01-30" })
//       const picker = await getPicker(page)
//       const spy = await picker.spyOnEvent("duetChange")

//       await openCalendar(page)

//       // wait for calendar to open
//       await page.waitForTimeout(ANIMATION_DELAY)

//       // make sure it's rendered correctly.
//       // We use a slightly higher threshold here since the CSS transition
//       // makes certain parts move slightly depending on how the browser converts
//       // the percentage based units into pixels.
//       const screenshot = await page.screenshot()
//       expect(screenshot).toMatchImageSnapshot({
//         failureThreshold: 0.001,
//         failureThresholdType: "percent",
//       })

//       // try clicking a day less than min
//       await clickDay(page, "1 January")
//       expect(spy).toHaveReceivedEventTimes(0)

//       // try clicking a day greater than max
//       await clickDay(page, "31 January")
//       expect(spy).toHaveReceivedEventTimes(0)

//       // click a day inside the range
//       await clickDay(page, "30 January")

//       expect(spy).toHaveReceivedEventTimes(1)
//       expect(spy.lastEvent.detail).toEqual({
//         component: "duet-date-picker",
//         value: "2020-01-30",
//         valueAsDate: new Date(2020, 0, 30).toISOString(),
//       })
//     })

//     it("disables prev month button if same month and year as min", async () => {
//       const page = await generatePage({ value: "2020-04-19", min: "2020-04-01" })

//       await openCalendar(page)

//       const prevMonthButton = await getPrevMonthButton(page)
//       expect(prevMonthButton).toHaveAttribute("disabled")
//     })

//     it("disables next month button if same month and year as max", async () => {
//       const page = await generatePage({ value: "2020-04-19", max: "2020-04-30" })

//       await openCalendar(page)

//       const nextMonthButton = await getNextMonthButton(page)
//       expect(nextMonthButton).toHaveAttribute("disabled")
//     })

//     it("does not disable prev/next buttons when only month value (but not year) is same as min and max", async () => {
//       // there was a bug whereby both buttons would be disabled if the min/max/selected date
//       // had the same month (here: 4), but different years. this tests ensures no regression
//       const page = await generatePage({ value: "2020-04-19", min: "2019-04-19", max: "2021-04-19" })

//       await openCalendar(page)

//       const prevMonthButton = await getPrevMonthButton(page)
//       const nextMonthButton = await getNextMonthButton(page)

//       expect(prevMonthButton).not.toHaveAttribute("disabled")
//       expect(nextMonthButton).not.toHaveAttribute("disabled")
//     })

//     it("respects min/max dates when generating year dropdown", async () => {
//       const page = await generatePage({ value: "2020-04-19", min: "2019-04-19", max: "2021-04-19" })
//       const picker = await getPicker(page)

//       // range smaller than default 40 year range
//       let options = await getYearOptions(page)
//       expect(options).toEqual(["2019", "2020", "2021"])

//       // range larger than default 40 year range
//       const minYear = 1990
//       const maxYear = 2050
//       picker.setAttribute("min", `${minYear}-01-02`)
//       picker.setAttribute("max", `${maxYear}-01-30`)
//       ////await page.waitForTimeoutChanges()

//       options = await getYearOptions(page)

//       expect(options.length).toBe(maxYear - minYear + 1)
//       expect(options[0]).toBe(minYear.toString())
//       expect(options[options.length - 1]).toBe(maxYear.toString())
//     })

//     it("respects min/max dates when generating month dropdown", async () => {
//       const page = await generatePage({ value: "2020-04-19", min: "2019-04-01", max: "2020-05-31" })

//       await openCalendar(page)

//       function getAllowedMonths() {
//         return page.$eval(".duet-date__select--month", (select: HTMLSelectElement) => {
//           return Array.from(select.options)
//             .filter(option => !option.disabled)
//             .map(option => option.value)
//         })
//       }

//       // in 2020, January - May is allowed
//       let allowedMonths = await getAllowedMonths()
//       expect(allowedMonths).toEqual(["0", "1", "2", "3", "4"])

//       await setYearDropdown(page, "2019")

//       // in 2019, April - December is allowed
//       allowedMonths = await getAllowedMonths()
//       expect(allowedMonths).toEqual(["3", "4", "5", "6", "7", "8", "9", "10", "11"])
//     })
//   })

//   describe("methods", () => {
//     it("should open calendar on show()", async () => {
//       const page = await generatePage()
//       const picker = await getPicker(page)

//       expect(await isCalendarOpen(page)).toBe(false)

//       await picker.callMethod("show")
//       //await page.waitForTimeoutChanges()

//       expect(await isCalendarOpen(page)).toBe(true)
//     })

//     it("should close calendar on hide()", async () => {
//       const page = await generatePage()
//       const picker = await getPicker(page)

//       await picker.callMethod("show")
//       //await page.waitForTimeoutChanges()
//       expect(await isCalendarOpen(page)).toBe(true)

//       await picker.callMethod("hide")
//       //await page.waitForTimeoutChanges()

//       const dialog = await getDialog(page)
//       //await dialog.waitForTimeoutNotVisible()

//       expect(await isCalendarOpen(page)).toBe(false)
//     })

//     it("should focus input on setFocus()", async () => {
//       const page = await generatePage()
//       const picker = await getPicker(page)

//       await picker.callMethod("setFocus")
//       //await page.waitForTimeoutChanges()

//       const focused = await getFocusedElement(page)
//       const tagName = await page.evaluate(element => element.tagName, focused)

//       expect(tagName.toLowerCase()).toEqualText("input")
//     })
//   })

//   describe("form interaction", () => {
//     it("supports required attribute", async () => {
//       const page = await createPage(`
//         <form>
//           <duet-date-picker required></duet-date-picker>
//           <button type="submit">submit</button>
//         </form>
//       `)

//       const picker = await getPicker(page)
//       const form = await page.find("form")
//       const button = await page.find("button[type='submit']")
//       const spy = await form.spyOnEvent("submit")

//       await button.click()
//       //await page.waitForTimeoutChanges()

//       expect(spy).toHaveReceivedEventTimes(0)

//       picker.setProperty("value", "2020-01-01")
//       //await page.waitForTimeoutChanges()
//       await button.click()

//       expect(spy).toHaveReceivedEventTimes(1)
//     })

//     it("always submits value as ISO date", async () => {
//       const page = await createPage(`
//         <form>
//           <duet-date-picker name="test"></duet-date-picker>
//           <button type="submit">submit</button>
//         </form>
//       `)

//       const picker = await getPicker(page)
//       const input = await getInput(page)

//       // use non-ISO date format
//       await page.$eval("duet-date-picker", async (picker: HTMLDuetDatePickerElement) => {
//         var DATE_FORMAT = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/

//         picker.dateAdapter = {
//           parse(value = "", createDate) {
//             const matches = value.match(DATE_FORMAT)
//             if (matches) {
//               return createDate(matches[3], matches[2], matches[1])
//             }
//           },
//           format(date) {
//             return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
//           },
//         }
//       })

//       picker.setProperty("value", "2020-01-01")
//       //await page.waitForTimeoutChanges()

//       // submitted value should be ISO format
//       const submittedValue = await page.$eval("form", (form: HTMLFormElement) => new FormData(form).get("test"))
//       expect(submittedValue).toEqual("2020-01-01")

//       // whilst the displayed value should be Finnish format
//       expect(await input.getProperty("value")).toEqual("1.1.2020")
//     })
//   })
// })
