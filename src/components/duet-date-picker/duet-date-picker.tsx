import {
  Component,
  ComponentInterface,
  Host,
  Prop,
  Element,
  h,
  Event,
  EventEmitter,
  State,
  Listen,
  Method,
  Watch,
} from "@stencil/core"
import {
  addDays,
  startOfWeek,
  endOfWeek,
  setMonth,
  setYear,
  clamp,
  inRange,
  endOfMonth,
  startOfMonth,
  printISODate,
  parseISODate,
  createIdentifier,
  DaysOfWeek,
  createDate,
} from "./date-utils"
import { DatePickerInput } from "./date-picker-input"
import { DatePickerMonth } from "./date-picker-month"
import defaultLocalization, { DuetLocalizedText } from "./date-localization"
import isoAdapter, { DuetDateAdapter } from "./date-adapter"

function range(from: number, to: number) {
  var result: number[] = []
  for (var i = from; i <= to; i++) {
    result.push(i)
  }
  return result
}

const keyCode = {
  TAB: 9,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
}

export type DuetDatePickerChangeEvent = {
  component: "duet-date-picker"
  valueAsDate: Date
  value: string
}
export type DuetDatePickerFocusEvent = {
  component: "duet-date-picker"
}
export type DuetDatePickerDirection = "left" | "right"

const DISALLOWED_CHARACTERS = /[^0-9\.\/\-]+/g
const TRANSITION_MS = 300

@Component({
  tag: "duet-date-picker",
  styleUrl: "duet-date-picker.scss",
  shadow: false,
  scoped: false,
})
export class DuetDatePicker implements ComponentInterface {
  /**
   * Own Properties
   */
  private monthSelectId = createIdentifier("DuetDateMonth")
  private yearSelectId = createIdentifier("DuetDateYear")
  private dialogLabelId = createIdentifier("DuetDateLabel")

  private datePickerButton: HTMLButtonElement
  private datePickerInput: HTMLInputElement
  private firstFocusableElement: HTMLElement
  private monthSelectNode: HTMLElement
  private dialogWrapperNode: HTMLElement
  private focusedDayNode: HTMLButtonElement

  private focusTimeoutId: ReturnType<typeof setTimeout>

  private initialTouchX: number = null
  private initialTouchY: number = null

  /**
   * Whilst dateAdapter is used for handling the formatting/parsing dates in the input,
   * these are used to format dates exclusively for the benefit of screen readers.
   *
   * We prefer DateTimeFormat over date.toLocaleDateString, as the former has
   * better performance when formatting large number of dates. See:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#Performance
   */
  private dateFormatShort: Intl.DateTimeFormat
  private dateFormatLong: Intl.DateTimeFormat

  /**
   * Reference to host HTML element.
   */
  @Element() element: HTMLElement

  /**
   * State() variables
   */
  @State() activeFocus = false
  @State() focusedDay = new Date()
  @State() open = false

  /**
   * Public Property API
   */

  /**
   * Name of the date picker input.
   */
  @Prop() name: string = "date"

  /**
   * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
   */
  @Prop() identifier: string = ""

  /**
   * Makes the date picker input component disabled. This prevents users from being able to
   * interact with the input, and conveys its inactive state to assistive technologies.
   */
  @Prop({ reflect: true }) disabled: boolean = false

  /**
   * Defines a specific role attribute for the date picker input.
   */
  @Prop() role: string

  /**
   * Forces the opening direction of the calendar modal to be always left or right.
   * This setting can be useful when the input is smaller than the opening date picker
   * would be as by default the picker always opens towards right.
   */
  @Prop() direction: DuetDatePickerDirection = "right"

  /**
   * Should the input be marked as required?
   */
  @Prop() required: boolean = false

  /**
   * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  @Prop({ reflect: true }) value: string = ""

  /**
   * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the max property.
   */
  @Prop() min: string = ""

  /**
   * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the min property.
   */
  @Prop() max: string = ""

  /**
   * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
   * Default is Monday.
   */
  @Prop() firstDayOfWeek: DaysOfWeek = DaysOfWeek.Monday

  /**
   * Button labels, day names, month names, etc, used for localization.
   * Default is English.
   */
  @Prop() localization: DuetLocalizedText = defaultLocalization

  /**
   * Date adapter, for custom parsing/formatting.
   * Must be object with a `parse` function which accepts a `string` and returns a `Date`,
   * and a `format` function which accepts a `Date` and returns a `string`.
   * Default is IS0-8601 parsing and formatting.
   */
  @Prop() dateAdapter: DuetDateAdapter = isoAdapter

  /**
   * Events section.
   */

  /**
   * Event emitted when a date is selected.
   */
  @Event() duetChange: EventEmitter<DuetDatePickerChangeEvent>

  /**
   * Event emitted the date picker input is blurred.
   */
  @Event() duetBlur: EventEmitter<DuetDatePickerFocusEvent>

  /**
   * Event emitted the date picker input is focused.
   */
  @Event() duetFocus: EventEmitter<DuetDatePickerFocusEvent>

  connectedCallback() {
    this.createDateFormatters()
  }

  @Watch("localization")
  createDateFormatters() {
    this.dateFormatShort = new Intl.DateTimeFormat(this.localization.locale, { day: "numeric", month: "long" })
    this.dateFormatLong = new Intl.DateTimeFormat(this.localization.locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  /**
   * Component event handling.
   */
  @Listen("click", { target: "document", capture: true })
  handleDocumentClick(e: MouseEvent) {
    if (!this.open) {
      return
    }

    const target = e.composedPath ? (e.composedPath()[0] as Node) : (e.target as Node)

    // TODO: stopPropagation only on open??

    // the dialog and the button aren't considered clicks outside.
    // dialog for obvious reasons, but the button needs to be skipped
    // so that two things are possible:
    //
    // a) clicking again on the button when dialog is open should close the modal.
    //    without skipping the button here, we would see a click outside
    //    _and_ a click on the button, so the `open` state goes
    //    open -> close (click outside) -> open (click button)
    //
    // b) clicking another date picker's button should close the current calendar
    //    and open the new one. this means we can't stopPropagation() on the button itself
    //
    // this was the only satisfactory combination of things to get the above to work
    if (this.dialogWrapperNode.contains(target) || this.datePickerButton.contains(target)) {
      return
    }

    this.hide(false)
  }

  /**
   * Public methods API
   */

  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  @Method() async setFocus() {
    return this.datePickerInput.focus()
  }

  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  @Method() async show() {
    this.open = true
    this.setFocusedDay(parseISODate(this.value) || new Date())

    clearTimeout(this.focusTimeoutId)
    this.focusTimeoutId = setTimeout(() => this.monthSelectNode.focus(), TRANSITION_MS)
  }

  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  @Method() async hide(moveFocusToButton = true) {
    this.open = false

    // in cases where calendar is quickly shown and hidden
    // we should avoid moving focus to the button
    clearTimeout(this.focusTimeoutId)

    if (moveFocusToButton) {
      // iOS VoiceOver needs to wait for all transitions to finish.
      setTimeout(() => this.datePickerButton.focus(), TRANSITION_MS + 200)
    }
  }

  /**
   * Local methods.
   */
  private enableActiveFocus = () => {
    this.activeFocus = true
  }

  private disableActiveFocus = () => {
    this.activeFocus = false
  }

  private addDays(days: number) {
    this.setFocusedDay(addDays(this.focusedDay, days))
  }

  private addMonths(months: number) {
    this.setMonth(this.focusedDay.getMonth() + months)
  }

  private addYears(years: number) {
    this.setYear(this.focusedDay.getFullYear() + years)
  }

  private startOfWeek() {
    this.setFocusedDay(startOfWeek(this.focusedDay, this.firstDayOfWeek))
  }

  private endOfWeek() {
    this.setFocusedDay(endOfWeek(this.focusedDay, this.firstDayOfWeek))
  }

  private setMonth(month: number) {
    const min = setMonth(startOfMonth(this.focusedDay), month)
    const max = endOfMonth(min)
    const date = setMonth(this.focusedDay, month)

    this.setFocusedDay(clamp(date, min, max))
  }

  private setYear(year: number) {
    const min = setYear(startOfMonth(this.focusedDay), year)
    const max = endOfMonth(min)
    const date = setYear(this.focusedDay, year)

    this.setFocusedDay(clamp(date, min, max))
  }

  private setFocusedDay(day: Date) {
    this.focusedDay = clamp(day, parseISODate(this.min), parseISODate(this.max))
  }

  private toggleOpen = (e: Event) => {
    e.preventDefault()
    this.open ? this.hide(false) : this.show()
  }

  private handleEscKey = (event: KeyboardEvent) => {
    if (event.keyCode === keyCode.ESC) {
      this.hide()
    }
  }

  private handleBlur = (event: Event) => {
    event.stopPropagation()

    this.duetBlur.emit({
      component: "duet-date-picker",
    })
  }

  private handleFocus = (event: Event) => {
    event.stopPropagation()

    this.duetFocus.emit({
      component: "duet-date-picker",
    })
  }

  private handleTouchStart = (event: TouchEvent) => {
    const touch = event.changedTouches[0]
    this.initialTouchX = touch.pageX
    this.initialTouchY = touch.pageY
  }

  private handleTouchMove = (event: TouchEvent) => {
    event.preventDefault()
  }

  private handleTouchEnd = (event: TouchEvent) => {
    const touch = event.changedTouches[0]
    const distX = touch.pageX - this.initialTouchX // get horizontal dist traveled
    const distY = touch.pageY - this.initialTouchY // get vertical dist traveled
    const threshold = 70

    const isHorizontalSwipe = Math.abs(distX) >= threshold && Math.abs(distY) <= threshold
    const isDownwardsSwipe = Math.abs(distY) >= threshold && Math.abs(distX) <= threshold && distY > 0

    if (isHorizontalSwipe) {
      this.addMonths(distX < 0 ? 1 : -1)
    } else if (isDownwardsSwipe) {
      this.hide(false)
      event.preventDefault()
    }

    this.initialTouchY = null
    this.initialTouchX = null
  }

  private handleNextMonthClick = (event: MouseEvent) => {
    event.preventDefault()
    this.addMonths(1)
  }

  private handlePreviousMonthClick = (event: MouseEvent) => {
    event.preventDefault()
    this.addMonths(-1)
  }

  private handleFirstFocusableKeydown = (event: KeyboardEvent) => {
    // this ensures focus is trapped inside the dialog
    if (event.keyCode === keyCode.TAB && event.shiftKey) {
      this.focusedDayNode.focus()
      event.preventDefault()
    }
  }

  private handleKeyboardNavigation = (event: KeyboardEvent) => {
    // handle tab separately, since it needs to be treated
    // differently to other keyboard interactions
    if (event.keyCode === keyCode.TAB && !event.shiftKey) {
      event.preventDefault()
      this.firstFocusableElement.focus()
      return
    }

    var handled = true

    switch (event.keyCode) {
      case keyCode.RIGHT:
        this.addDays(1)
        break
      case keyCode.LEFT:
        this.addDays(-1)
        break
      case keyCode.DOWN:
        this.addDays(7)
        break
      case keyCode.UP:
        this.addDays(-7)
        break
      case keyCode.PAGE_UP:
        if (event.shiftKey) {
          this.addYears(-1)
        } else {
          this.addMonths(-1)
        }
        break
      case keyCode.PAGE_DOWN:
        if (event.shiftKey) {
          this.addYears(1)
        } else {
          this.addMonths(1)
        }
        break
      case keyCode.HOME:
        this.startOfWeek()
        break
      case keyCode.END:
        this.endOfWeek()
        break
      default:
        handled = false
    }

    if (handled) {
      event.preventDefault()
      this.enableActiveFocus()
    }
  }

  private handleDaySelect = (_event: MouseEvent, day: Date) => {
    if (!inRange(day, parseISODate(this.min), parseISODate(this.max))) {
      return
    }

    if (day.getMonth() === this.focusedDay.getMonth()) {
      this.setValue(day)
      this.hide()
    } else {
      this.setFocusedDay(day)
    }
  }

  private handleMonthSelect = e => {
    this.setMonth(parseInt(e.target.value, 10))
  }

  private handleYearSelect = e => {
    this.setYear(parseInt(e.target.value, 10))
  }

  private handleInputChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement

    // clean up any invalid characters
    target.value = target.value.replace(DISALLOWED_CHARACTERS, "")

    const parsed = this.dateAdapter.parse(target.value, createDate)
    if (parsed || target.value === "") {
      this.setValue(parsed)
    }
  }

  private setValue(date: Date) {
    this.value = printISODate(date)
    this.duetChange.emit({
      component: "duet-date-picker",
      value: this.value,
      valueAsDate: date,
    })
  }

  private processFocusedDayNode = (element: HTMLButtonElement) => {
    this.focusedDayNode = element

    if (this.activeFocus && this.open) {
      setTimeout(() => element.focus(), 0)
    }
  }

  /**
   * render() function
   * Always the last one in the class.
   */
  render() {
    const valueAsDate = parseISODate(this.value)
    const formattedDate = valueAsDate && this.dateAdapter.format(valueAsDate)
    const selectedYear = (valueAsDate || this.focusedDay).getFullYear()
    const focusedMonth = this.focusedDay.getMonth()
    const focusedYear = this.focusedDay.getFullYear()

    const minDate = parseISODate(this.min)
    const maxDate = parseISODate(this.max)
    const prevMonthDisabled =
      minDate != null && minDate.getMonth() === focusedMonth && minDate.getFullYear() === focusedYear
    const nextMonthDisabled =
      maxDate != null && maxDate.getMonth() === focusedMonth && maxDate.getFullYear() === focusedYear

    const minYear = minDate ? minDate.getFullYear() : selectedYear - 10
    const maxYear = maxDate ? maxDate.getFullYear() : selectedYear + 10

    return (
      <Host>
        <div class="duet-date">
          <DatePickerInput
            dateFormatter={this.dateFormatLong}
            value={this.value}
            valueAsDate={valueAsDate}
            formattedValue={formattedDate}
            onInput={this.handleInputChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onClick={this.toggleOpen}
            name={this.name}
            disabled={this.disabled}
            role={this.role}
            required={this.required}
            identifier={this.identifier}
            localization={this.localization}
            buttonRef={element => (this.datePickerButton = element)}
            inputRef={element => (this.datePickerInput = element)}
          />

          <div
            class={{
              "duet-date__dialog": true,
              "is-left": this.direction === "left",
              "is-active": this.open,
            }}
            role="dialog"
            aria-modal="true"
            aria-hidden={this.open ? "false" : "true"}
            aria-labelledby={this.dialogLabelId}
            onTouchMove={this.handleTouchMove}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
          >
            <div
              class="duet-date__dialog-content"
              onKeyDown={this.handleEscKey}
              ref={element => (this.dialogWrapperNode = element)}
            >
              <div class="duet-date__vhidden duet-date__instructions" aria-live="polite">
                {this.localization.keyboardInstruction}
              </div>
              {/**
               * With onFocusIn, which is what TS types expect, Stencil ends up listening to a
               * focusIn event, which is wrong as it needs to be focusin. So we had to use onFocusin
               * here which is wrong for the TS types, but ends up with the correct event listener
               * in Stencil. See issue: https://github.com/ionic-team/stencil/issues/2628
               */}
              {/* @ts-ignore */}
              <div class="duet-date__mobile" onFocusin={this.disableActiveFocus}>
                <label class="duet-date__mobile-heading">{this.localization.calendarHeading}</label>
                <button
                  class="duet-date__close"
                  ref={element => (this.firstFocusableElement = element)}
                  onKeyDown={this.handleFirstFocusableKeydown}
                  onClick={() => this.hide()}
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                  </svg>
                  <span class="duet-date__vhidden">{this.localization.closeLabel}</span>
                </button>
              </div>
              {/* @ts-ignore */}
              <div class="duet-date__header" onFocusin={this.disableActiveFocus}>
                <div>
                  <h2 id={this.dialogLabelId} class="duet-date__vhidden" aria-live="polite" aria-atomic="true">
                    {this.localization.monthNames[focusedMonth]} {this.focusedDay.getFullYear()}
                  </h2>

                  <label htmlFor={this.monthSelectId} class="duet-date__vhidden">
                    {this.localization.monthSelectLabel}
                  </label>
                  <div class="duet-date__select">
                    <select
                      id={this.monthSelectId}
                      class="duet-date__select--month"
                      ref={element => (this.monthSelectNode = element)}
                      onChange={this.handleMonthSelect}
                    >
                      {this.localization.monthNames.map((month, i) => (
                        <option key={month} value={i} selected={i === focusedMonth}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <div class="duet-date__select-label" aria-hidden="true">
                      <span>{this.localization.monthNamesShort[focusedMonth]}</span>
                      <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
                      </svg>
                    </div>
                  </div>

                  <label htmlFor={this.yearSelectId} class="duet-date__vhidden">
                    {this.localization.yearSelectLabel}
                  </label>
                  <div class="duet-date__select">
                    <select id={this.yearSelectId} class="duet-date__select--year" onChange={this.handleYearSelect}>
                      {range(minYear, maxYear).map(year => (
                        <option key={year} selected={year === focusedYear}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <div class="duet-date__select-label" aria-hidden="true">
                      <span>{this.focusedDay.getFullYear()}</span>
                      <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="duet-date__nav">
                  <button
                    class="duet-date__prev"
                    onClick={this.handlePreviousMonthClick}
                    disabled={prevMonthDisabled}
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" />
                    </svg>
                    <span class="duet-date__vhidden">{this.localization.prevMonthLabel}</span>
                  </button>
                  <button
                    class="duet-date__next"
                    onClick={this.handleNextMonthClick}
                    disabled={nextMonthDisabled}
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z" />
                    </svg>
                    <span class="duet-date__vhidden">{this.localization.nextMonthLabel}</span>
                  </button>
                </div>
              </div>
              <DatePickerMonth
                dateFormatter={this.dateFormatShort}
                selectedDate={valueAsDate}
                focusedDate={this.focusedDay}
                onDateSelect={this.handleDaySelect}
                onKeyboardNavigation={this.handleKeyboardNavigation}
                labelledById={this.dialogLabelId}
                localization={this.localization}
                firstDayOfWeek={this.firstDayOfWeek}
                focusedDayRef={this.processFocusedDayNode}
                min={minDate}
                max={maxDate}
              />
            </div>
          </div>
        </div>
      </Host>
    )
  }
}
