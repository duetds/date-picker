import { Component, Host, Prop, Element, h, Event, State, Listen, Method, Watch, } from "@stencil/core";
import { addDays, startOfWeek, endOfWeek, setMonth, setYear, clamp, inRange, endOfMonth, startOfMonth, printISODate, parseISODate, createIdentifier, DaysOfWeek, } from "./date-utils";
import { DatePickerMonth } from "./date-picker-month";
import defaultLocalization from "./date-localization";
import isoAdapter from "./date-adapter";
function range(from, to) {
  var result = [];
  for (var i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
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
};
const TRANSITION_MS = 300;
export class DuetDatePicker {
  constructor() {
    /**
     * Own Properties
     */
    this.monthSelectId = createIdentifier("DuetDateMonth");
    this.yearSelectId = createIdentifier("DuetDateYear");
    this.dialogLabelId = createIdentifier("DuetDateLabel");
    this.initialTouchX = null;
    this.initialTouchY = null;
    /**
     * State() variables
     */
    this.activeFocus = false;
    this.focusedDay = new Date();
    this.open = true;
    /**
     * Public Property API
     */
    /**
     * Name of the date picker input.
     */
    this.name = "date";
    /**
     * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
     */
    this.identifier = "";
    /**
     * Makes the date picker input component disabled. This prevents users from being able to
     * interact with the input, and conveys its inactive state to assistive technologies.
     */
    this.disabled = false;
    /**
     * Forces the opening direction of the calendar modal to be always left or right.
     * This setting can be useful when the input is smaller than the opening date picker
     * would be as by default the picker always opens towards right.
     */
    this.direction = "right";
    /**
     * Should the input be marked as required?
     */
    this.required = false;
    /**
     * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
     */
    this.value = "";
    /**
     * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
     * This setting can be used alone or together with the max property.
     */
    this.min = "";
    /**
     * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
     * This setting can be used alone or together with the min property.
     */
    this.max = "";
    /**
     * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
     * Default is Monday.
     */
    this.firstDayOfWeek = DaysOfWeek.Monday;
    /**
     * Button labels, day names, month names, etc, used for localization.
     * Default is English.
     */
    this.localization = defaultLocalization;
    /**
     * Date adapter, for custom parsing/formatting.
     * Must be object with a `parse` function which accepts a `string` and returns a `Date`,
     * and a `format` function which accepts a `Date` and returns a `string`.
     * Default is IS0-8601 parsing and formatting.
     */
    this.dateAdapter = isoAdapter;
    /**
     * Controls which days are disabled and therefore disallowed.
     * For example, this can be used to disallow selection of weekends.
     */
    this.isDateDisabled = () => false;
    /**
     * Local methods.
     */
    this.enableActiveFocus = () => {
      this.activeFocus = true;
    };
    this.disableActiveFocus = () => {
      this.activeFocus = false;
    };
    this.handleEscKey = (event) => {
      if (event.keyCode === keyCode.ESC) {
        this.hide();
      }
    };
    this.handleTouchStart = (event) => {
      const touch = event.changedTouches[0];
      this.initialTouchX = touch.pageX;
      this.initialTouchY = touch.pageY;
    };
    this.handleTouchMove = (event) => {
      event.preventDefault();
    };
    this.handleTouchEnd = (event) => {
      const touch = event.changedTouches[0];
      const distX = touch.pageX - this.initialTouchX; // get horizontal dist traveled
      const distY = touch.pageY - this.initialTouchY; // get vertical dist traveled
      const threshold = 70;
      const isHorizontalSwipe = Math.abs(distX) >= threshold && Math.abs(distY) <= threshold;
      const isDownwardsSwipe = Math.abs(distY) >= threshold && Math.abs(distX) <= threshold && distY > 0;
      if (isHorizontalSwipe) {
        this.addMonths(distX < 0 ? 1 : -1);
      }
      else if (isDownwardsSwipe) {
        this.hide(false);
        event.preventDefault();
      }
      this.initialTouchY = null;
      this.initialTouchX = null;
    };
    this.handleNextMonthClick = (event) => {
      event.preventDefault();
      this.addMonths(1);
    };
    this.handlePreviousMonthClick = (event) => {
      event.preventDefault();
      this.addMonths(-1);
    };
    this.handleFirstFocusableKeydown = (event) => {
      // this ensures focus is trapped inside the dialog
      if (event.keyCode === keyCode.TAB && event.shiftKey) {
        this.focusedDayNode.focus();
        event.preventDefault();
      }
    };
    this.handleKeyboardNavigation = (event) => {
      // handle tab separately, since it needs to be treated
      // differently to other keyboard interactions
      if (event.keyCode === keyCode.TAB && !event.shiftKey) {
        event.preventDefault();
        this.firstFocusableElement.focus();
        return;
      }
      var handled = true;
      switch (event.keyCode) {
        case keyCode.RIGHT:
          this.addDays(1);
          break;
        case keyCode.LEFT:
          this.addDays(-1);
          break;
        case keyCode.DOWN:
          this.addDays(7);
          break;
        case keyCode.UP:
          this.addDays(-7);
          break;
        case keyCode.PAGE_UP:
          if (event.shiftKey) {
            this.addYears(-1);
          }
          else {
            this.addMonths(-1);
          }
          break;
        case keyCode.PAGE_DOWN:
          if (event.shiftKey) {
            this.addYears(1);
          }
          else {
            this.addMonths(1);
          }
          break;
        case keyCode.HOME:
          this.startOfWeek();
          break;
        case keyCode.END:
          this.endOfWeek();
          break;
        default:
          handled = false;
      }
      if (handled) {
        event.preventDefault();
        this.enableActiveFocus();
      }
    };
    this.handleDaySelect = (_event, day) => {
      const isInRange = inRange(day, parseISODate(this.min), parseISODate(this.max));
      const isAllowed = !this.isDateDisabled(day);
      if (isInRange && isAllowed) {
        this.setValue(day);
        this.hide();
      }
      else {
        // for consistency we should set the focused day in cases where
        // user has selected a day that has been specifically disallowed
        this.setFocusedDay(day);
      }
    };
    this.handleMonthSelect = e => {
      this.setMonth(parseInt(e.target.value, 10));
    };
    this.handleYearSelect = e => {
      this.setYear(parseInt(e.target.value, 10));
    };
    this.processFocusedDayNode = (element) => {
      this.focusedDayNode = element;
      if (this.activeFocus && this.open) {
        setTimeout(() => element.focus(), 0);
      }
    };
  }
  connectedCallback() {
    this.createDateFormatters();
  }
  createDateFormatters() {
    this.dateFormatShort = new Intl.DateTimeFormat(this.localization.locale, { day: "numeric", month: "long" });
  }
  /**
   * Component event handling.
   */
  handleDocumentClick(e) {
    if (!this.open) {
      return;
    }
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
    const isClickOutside = e
      .composedPath()
      .every(node => node !== this.dialogWrapperNode && node !== this.datePickerButton);
    if (isClickOutside) {
      this.hide(false);
    }
  }
  /**
   * Public methods API
   */
  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  async setFocus() {
    return this.datePickerInput.focus();
  }
  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  async show() {
    this.open = true;
    this.duetOpen.emit({
      component: "duet-date-picker",
    });
    this.setFocusedDay(parseISODate(this.value) || new Date());
    clearTimeout(this.focusTimeoutId);
    this.focusTimeoutId = setTimeout(() => this.monthSelectNode.focus(), TRANSITION_MS);
  }
  /**
   * Never hide the calendar modal.
   */
  async hide(option = true) {
    return option;
  }
  addDays(days) {
    this.setFocusedDay(addDays(this.focusedDay, days));
  }
  addMonths(months) {
    this.setMonth(this.focusedDay.getMonth() + months);
  }
  addYears(years) {
    this.setYear(this.focusedDay.getFullYear() + years);
  }
  startOfWeek() {
    this.setFocusedDay(startOfWeek(this.focusedDay, this.firstDayOfWeek));
  }
  endOfWeek() {
    this.setFocusedDay(endOfWeek(this.focusedDay, this.firstDayOfWeek));
  }
  setMonth(month) {
    const min = setMonth(startOfMonth(this.focusedDay), month);
    const max = endOfMonth(min);
    const date = setMonth(this.focusedDay, month);
    this.setFocusedDay(clamp(date, min, max));
  }
  setYear(year) {
    const min = setYear(startOfMonth(this.focusedDay), year);
    const max = endOfMonth(min);
    const date = setYear(this.focusedDay, year);
    this.setFocusedDay(clamp(date, min, max));
  }
  setFocusedDay(day) {
    this.focusedDay = clamp(day, parseISODate(this.min), parseISODate(this.max));
  }
  setValue(date) {
    this.value = printISODate(date);
    this.duetChange.emit({
      component: "duet-date-picker",
      value: this.value,
      valueAsDate: date,
    });
  }
  /**
   * render() function
   * Always the last one in the class.
   */
  render() {
    const valueAsDate = parseISODate(this.value);
    const selectedYear = (valueAsDate || this.focusedDay).getFullYear();
    const focusedMonth = this.focusedDay.getMonth();
    const focusedYear = this.focusedDay.getFullYear();
    const minDate = parseISODate(this.min);
    const maxDate = parseISODate(this.max);
    const prevMonthDisabled = minDate != null && minDate.getMonth() === focusedMonth && minDate.getFullYear() === focusedYear;
    const nextMonthDisabled = maxDate != null && maxDate.getMonth() === focusedMonth && maxDate.getFullYear() === focusedYear;
    const minYear = minDate ? minDate.getFullYear() : selectedYear - 10;
    const maxYear = maxDate ? maxDate.getFullYear() : selectedYear + 10;
    return (h(Host, null,
      h("div", { class: "duet-date" },
        h("div", { class: {
            "duet-date__dialog": true,
            "is-left": this.direction === "left",
            "is-active": this.open,
          }, role: "dialog", "aria-modal": "true", "aria-hidden": this.open ? "false" : "true", "aria-labelledby": this.dialogLabelId, onTouchMove: this.handleTouchMove, onTouchStart: this.handleTouchStart, onTouchEnd: this.handleTouchEnd },
          h("div", { class: "duet-date__dialog-content", onKeyDown: this.handleEscKey, ref: element => (this.dialogWrapperNode = element) },
            h("div", { class: "duet-date__mobile", onFocusin: this.disableActiveFocus },
              h("label", { class: "duet-date__mobile-heading" }, this.localization.calendarHeading),
              h("button", { class: "duet-date__close", ref: element => (this.firstFocusableElement = element), onKeyDown: this.handleFirstFocusableKeydown, onClick: () => this.hide(), type: "button" },
                h("svg", { "aria-hidden": "true", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" },
                  h("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
                  h("path", { d: "M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" })),
                h("span", { class: "duet-date__vhidden" }, this.localization.closeLabel))),
            h("div", { class: "duet-date__header", onFocusin: this.disableActiveFocus },
              h("div", null,
                h("h2", { id: this.dialogLabelId, class: "duet-date__vhidden", "aria-live": "polite", "aria-atomic": "true" },
                  this.localization.monthNames[focusedMonth],
                  " ",
                  this.focusedDay.getFullYear()),
                h("label", { htmlFor: this.monthSelectId, class: "duet-date__vhidden" }, this.localization.monthSelectLabel),
                h("div", { class: "duet-date__select" },
                  h("select", { id: this.monthSelectId, class: "duet-date__select--month", ref: element => (this.monthSelectNode = element), onChange: this.handleMonthSelect }, this.localization.monthNames.map((month, i) => (h("option", { key: month, value: i, selected: i === focusedMonth, disabled: !inRange(new Date(focusedYear, i, 1), minDate ? startOfMonth(minDate) : null, maxDate ? endOfMonth(maxDate) : null) }, month)))),
                  h("div", { class: "duet-date__select-label", "aria-hidden": "true" },
                    h("span", null, this.localization.monthNamesShort[focusedMonth]),
                    h("svg", { fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" },
                      h("path", { d: "M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" })))),
                h("label", { htmlFor: this.yearSelectId, class: "duet-date__vhidden" }, this.localization.yearSelectLabel),
                h("div", { class: "duet-date__select" },
                  h("select", { id: this.yearSelectId, class: "duet-date__select--year", onChange: this.handleYearSelect }, range(minYear, maxYear).map(year => (h("option", { key: year, selected: year === focusedYear }, year)))),
                  h("div", { class: "duet-date__select-label", "aria-hidden": "true" },
                    h("span", null, this.focusedDay.getFullYear()),
                    h("svg", { fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" },
                      h("path", { d: "M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" }))))),
              h("div", { class: "duet-date__nav" },
                h("button", { class: "duet-date__prev", onClick: this.handlePreviousMonthClick, disabled: prevMonthDisabled, type: "button" },
                  h("svg", { "aria-hidden": "true", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "21", height: "21", viewBox: "0 0 24 24" },
                    h("path", { d: "M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" })),
                  h("span", { class: "duet-date__vhidden" }, this.localization.prevMonthLabel)),
                h("button", { class: "duet-date__next", onClick: this.handleNextMonthClick, disabled: nextMonthDisabled, type: "button" },
                  h("svg", { "aria-hidden": "true", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "21", height: "21", viewBox: "0 0 24 24" },
                    h("path", { d: "M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z" })),
                  h("span", { class: "duet-date__vhidden" }, this.localization.nextMonthLabel)))),
            h(DatePickerMonth, { dateFormatter: this.dateFormatShort, selectedDate: valueAsDate, focusedDate: this.focusedDay, onDateSelect: this.handleDaySelect, onKeyboardNavigation: this.handleKeyboardNavigation, labelledById: this.dialogLabelId, localization: this.localization, firstDayOfWeek: this.firstDayOfWeek, focusedDayRef: this.processFocusedDayNode, min: minDate, max: maxDate, isDateDisabled: this.isDateDisabled }))))));
  }
  static get is() { return "duet-date-picker"; }
  static get originalStyleUrls() { return {
    "$": ["duet-date-picker.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["duet-date-picker.css"]
  }; }
  static get properties() { return {
    "name": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Name of the date picker input."
      },
      "attribute": "name",
      "reflect": false,
      "defaultValue": "\"date\""
    },
    "identifier": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Adds a unique identifier for the date picker input. Use this instead of html `id` attribute."
      },
      "attribute": "identifier",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "disabled": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Makes the date picker input component disabled. This prevents users from being able to\ninteract with the input, and conveys its inactive state to assistive technologies."
      },
      "attribute": "disabled",
      "reflect": true,
      "defaultValue": "false"
    },
    "role": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Defines a specific role attribute for the date picker input."
      },
      "attribute": "role",
      "reflect": false
    },
    "direction": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "DuetDatePickerDirection",
        "resolved": "\"left\" | \"right\"",
        "references": {
          "DuetDatePickerDirection": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Forces the opening direction of the calendar modal to be always left or right.\nThis setting can be useful when the input is smaller than the opening date picker\nwould be as by default the picker always opens towards right."
      },
      "attribute": "direction",
      "reflect": false,
      "defaultValue": "\"right\""
    },
    "required": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Should the input be marked as required?"
      },
      "attribute": "required",
      "reflect": false,
      "defaultValue": "false"
    },
    "value": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Date value. Must be in IS0-8601 format: YYYY-MM-DD."
      },
      "attribute": "value",
      "reflect": true,
      "defaultValue": "\"\""
    },
    "min": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.\nThis setting can be used alone or together with the max property."
      },
      "attribute": "min",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "max": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.\nThis setting can be used alone or together with the min property."
      },
      "attribute": "max",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "firstDayOfWeek": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "DaysOfWeek",
        "resolved": "DaysOfWeek.Friday | DaysOfWeek.Monday | DaysOfWeek.Saturday | DaysOfWeek.Sunday | DaysOfWeek.Thursday | DaysOfWeek.Tuesday | DaysOfWeek.Wednesday",
        "references": {
          "DaysOfWeek": {
            "location": "import",
            "path": "./date-utils"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.\nDefault is Monday."
      },
      "attribute": "first-day-of-week",
      "reflect": false,
      "defaultValue": "DaysOfWeek.Monday"
    },
    "localization": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "DuetLocalizedText",
        "resolved": "{ buttonLabel: string; placeholder: string; selectedDateMessage: string; prevMonthLabel: string; nextMonthLabel: string; monthSelectLabel: string; yearSelectLabel: string; closeLabel: string; calendarHeading: string; dayNames: DayNames; monthNames: MonthsNames; monthNamesShort: MonthsNames; locale: string | string[]; }",
        "references": {
          "DuetLocalizedText": {
            "location": "import",
            "path": "./date-localization"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Button labels, day names, month names, etc, used for localization.\nDefault is English."
      },
      "defaultValue": "defaultLocalization"
    },
    "dateAdapter": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "DuetDateAdapter",
        "resolved": "DuetDateAdapter",
        "references": {
          "DuetDateAdapter": {
            "location": "import",
            "path": "./date-adapter"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Date adapter, for custom parsing/formatting.\nMust be object with a `parse` function which accepts a `string` and returns a `Date`,\nand a `format` function which accepts a `Date` and returns a `string`.\nDefault is IS0-8601 parsing and formatting."
      },
      "defaultValue": "isoAdapter"
    },
    "isDateDisabled": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "DateDisabledPredicate",
        "resolved": "(date: Date) => boolean",
        "references": {
          "DateDisabledPredicate": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Controls which days are disabled and therefore disallowed.\nFor example, this can be used to disallow selection of weekends."
      },
      "defaultValue": "() => false"
    }
  }; }
  static get states() { return {
    "activeFocus": {},
    "focusedDay": {},
    "open": {}
  }; }
  static get events() { return [{
      "method": "duetChange",
      "name": "duetChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event emitted when a date is selected."
      },
      "complexType": {
        "original": "DuetDatePickerChangeEvent",
        "resolved": "{ component: \"duet-date-picker\"; valueAsDate: Date; value: string; }",
        "references": {
          "DuetDatePickerChangeEvent": {
            "location": "local"
          }
        }
      }
    }, {
      "method": "duetBlur",
      "name": "duetBlur",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event emitted the date picker input is blurred."
      },
      "complexType": {
        "original": "DuetDatePickerFocusEvent",
        "resolved": "{ component: \"duet-date-picker\"; }",
        "references": {
          "DuetDatePickerFocusEvent": {
            "location": "local"
          }
        }
      }
    }, {
      "method": "duetFocus",
      "name": "duetFocus",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event emitted the date picker input is focused."
      },
      "complexType": {
        "original": "DuetDatePickerFocusEvent",
        "resolved": "{ component: \"duet-date-picker\"; }",
        "references": {
          "DuetDatePickerFocusEvent": {
            "location": "local"
          }
        }
      }
    }, {
      "method": "duetOpen",
      "name": "duetOpen",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event emitted the date picker modal is opened."
      },
      "complexType": {
        "original": "DuetDatePickerOpenEvent",
        "resolved": "{ component: \"duet-date-picker\"; }",
        "references": {
          "DuetDatePickerOpenEvent": {
            "location": "local"
          }
        }
      }
    }, {
      "method": "duetClose",
      "name": "duetClose",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event emitted the date picker modal is closed."
      },
      "complexType": {
        "original": "DuetDatePickerCloseEvent",
        "resolved": "{ component: \"duet-date-picker\"; }",
        "references": {
          "DuetDatePickerCloseEvent": {
            "location": "local"
          }
        }
      }
    }]; }
  static get methods() { return {
    "setFocus": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Sets focus on the date picker's input. Use this method instead of the global `focus()`.",
        "tags": []
      }
    },
    "show": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Show the calendar modal, moving focus to the calendar inside.",
        "tags": []
      }
    },
    "hide": {
      "complexType": {
        "signature": "(option?: boolean) => Promise<boolean>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<boolean>"
      },
      "docs": {
        "text": "Never hide the calendar modal.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "localization",
      "methodName": "createDateFormatters"
    }]; }
  static get listeners() { return [{
      "name": "click",
      "method": "handleDocumentClick",
      "target": "document",
      "capture": true,
      "passive": false
    }]; }
}
