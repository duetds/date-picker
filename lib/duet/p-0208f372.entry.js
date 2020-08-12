import { h, r as registerInstance, e as createEvent, f as Host, g as getElement } from './p-cc1e0b8e.js';

const DatePickerInput = ({ onClick, placeholder, buttonLabel, name, inputLabel, value, identifier, disabled, error, role, labelHidden, buttonRef, inputRef, onInput, onBlur, onFocus, }) => {
    return (h("div", { class: "duet-date-input" },
        h("div", { class: {
                "duet-input-container": true,
                "duet-label-hidden": labelHidden,
                "has-error": !!error,
            } },
            h("label", { id: "foo", htmlFor: identifier }, inputLabel),
            h("div", { class: "duet-input-relative" },
                h("input", { name: name, value: value, placeholder: placeholder, id: identifier, disabled: disabled, role: role, "aria-autocomplete": "none", onInput: onInput, onFocus: onFocus, onBlur: onBlur, autoComplete: "off", ref: inputRef }),
                h("button", { class: { "duet-date-button": true, "duet-no-label": labelHidden }, onClick: onClick, disabled: disabled, ref: buttonRef, type: "button" }, buttonLabel))),
        h("span", { class: "duet-input-help", id: "foo", "aria-live": "assertive", "aria-relevant": "additions removals" }, error && h("span", null, error))));
};

const DATE_FORMAT = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;
const DATE_OUTPUT_FORMAT = "dd.mm.yyyy";
const DATE_ISO_OUTPUT_FORMAT = "YYYY-MM-DD";
function createDate(year, month, day) {
    var dayInt = parseInt(day, 10);
    var monthInt = parseInt(month, 10);
    var yearInt = parseInt(year, 10);
    const isValid = Number.isInteger(yearInt) && // all parts should be integers
        Number.isInteger(monthInt) &&
        Number.isInteger(dayInt) &&
        monthInt > 0 && // month must be 1-12
        monthInt <= 12 &&
        dayInt > 0 && // day must be 1-31
        dayInt <= 31 &&
        yearInt > 0;
    if (isValid) {
        return new Date(yearInt, monthInt - 1, dayInt);
    }
}
/**
 * @param value date string in format dd.mm.yyyy
 */
function parseDate(value) {
    if (!value) {
        return;
    }
    const matches = value.match(DATE_FORMAT);
    if (matches) {
        return createDate(matches[3], matches[2], matches[1]);
    }
}
/**
 * @param value date string in ISO format YYYY-MM-DD
 */
function parseISODate(value) {
    if (!value) {
        return;
    }
    const matches = value.match(ISO_DATE_FORMAT);
    if (matches) {
        return createDate(matches[1], matches[2], matches[3]);
    }
}
/**
 * @param date the date to format as a string
 * @param format the format string eg. "dd.mm.yyyy", "YYYY-MM-DD"
 */
function formatDate(date, format) {
    if (!date) {
        return "";
    }
    var d = date.getDate().toString(10);
    var m = (date.getMonth() + 1).toString(10);
    var y = date.getFullYear().toString(10);
    // days are not zero-indexed, so pad if less than 10
    if (date.getDate() < 10) {
        d = `0${d}`;
    }
    // months *are* zero-indexed, pad if less than 9!
    if (date.getMonth() < 9) {
        m = `0${m}`;
    }
    return format.replace(/MM/i, m).replace(/YYYY/i, y).replace(/DD/i, d);
}
/**
 * print date in format dd.mm.yyyy
 * @param date
 */
function printDate(date) {
    return formatDate(date, DATE_OUTPUT_FORMAT);
}
/**
 * print date in format YYYY-MM-DD
 * @param date
 */
function printISODate(date) {
    return formatDate(date, DATE_ISO_OUTPUT_FORMAT);
}
/**
 * Compare if two dates are equal in terms of day, month, and year
 */
function isEqual(a, b) {
    if (a == null || b == null) {
        return false;
    }
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addDays(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}
function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(date.getMonth() + months);
    return d;
}
function addYears(date, years) {
    const d = new Date(date);
    d.setFullYear(date.getFullYear() + years);
    return d;
}
function startOfWeek(date, firstDayOfWeek = 1) {
    var d = new Date(date);
    var day = d.getDay();
    var diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
    d.setDate(d.getDate() - diff);
    return d;
}
function endOfWeek(date, firstDayOfWeek = 1) {
    var d = new Date(date);
    var day = d.getDay();
    var diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek);
    d.setDate(d.getDate() + diff);
    return d;
}
function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function setMonth(date, month) {
    const d = new Date(date);
    d.setMonth(month);
    return d;
}
function setYear(date, year) {
    const d = new Date(date);
    d.setFullYear(year);
    return d;
}
/**
 * Check if date is within a min and max
 */
function inRange(date, min, max) {
    return clamp(date, min, max) === date;
}
/**
 * Ensures date is within range, returns min or max if out of bounds
 */
function clamp(date, min, max) {
    const time = date.getTime();
    if (min && min instanceof Date && time < min.getTime()) {
        return min;
    }
    if (max && max instanceof Date && time > max.getTime()) {
        return max;
    }
    return date;
}
/**
 * given start and end date, return an (inclusive) array of all dates in between
 * @param start
 * @param end
 */
function getDaysInRange(start, end) {
    const days = [];
    let current = start;
    while (!isEqual(current, end)) {
        days.push(current);
        current = addDays(current, 1);
    }
    days.push(current);
    return days;
}
/**
 * given a date, return an array of dates from a calendar perspective
 * @param date
 * @param firstDayOfWeek
 */
function getViewOfMonth(date, firstDayOfWeek = 1) {
    const start = startOfWeek(startOfMonth(date), firstDayOfWeek);
    const end = endOfWeek(endOfMonth(date), firstDayOfWeek);
    return getDaysInRange(start, end);
}
/**
 * Form random hash
 */
function chr4() {
    return Math.random().toString(16).slice(-4);
}
/**
 * Create random identifier with a prefix
 * @param prefix
 */
function createIdentifier(prefix) {
    return `${prefix}-` + chr4() + chr4() + "-" + chr4() + "-" + chr4() + "-" + chr4() + "-" + chr4() + chr4() + chr4();
}

const i18n = {
    en: {
        locale: "en-GB",
        buttonLabel: "Choose date",
        prevMonthLabel: "Previous month",
        nextMonthLabel: "Next month",
        monthSelectLabel: "Month",
        yearSelectLabel: "Year",
        closeLabel: "Close window",
        keyboardInstruction: "You can use arrow keys to navigate dates",
        dayLabels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        placeholder: "dd.mm.yyyy",
        monthLabels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        monthLabelsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    fi: {
        locale: "fi-FI",
        buttonLabel: "Valitse päivämäärä",
        prevMonthLabel: "Edellinen kuukausi",
        nextMonthLabel: "Seuraava kuukausi",
        monthSelectLabel: "Kuukausi",
        yearSelectLabel: "Vuosi",
        closeLabel: "Sulje ikkuna",
        keyboardInstruction: "Voit navigoida päivämääriä nuolinäppäimillä",
        dayLabels: ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"],
        placeholder: "pp.kk.vvvv",
        monthLabels: [
            "Tammikuu",
            "Helmikuu",
            "Maaliskuu",
            "Huhtikuu",
            "Toukokuu",
            "Kesäkuu",
            "Heinäkuu",
            "Elokuu",
            "Syyskuu",
            "Lokakuu",
            "Marraskuu",
            "Joulukuu",
        ],
        monthLabelsShort: [
            "Tammi",
            "Helmi",
            "Maalis",
            "Huhti",
            "Touko",
            "Kesä",
            "Heinä",
            "Elo",
            "Syys",
            "Loka",
            "Marras",
            "Joulu",
        ],
    },
    sv: {
        locale: "sv-SE",
        buttonLabel: "Välj datum",
        prevMonthLabel: "Föregående månad",
        nextMonthLabel: "Nästa månad",
        monthSelectLabel: "Månad",
        yearSelectLabel: "År",
        closeLabel: "Stäng fönstret",
        keyboardInstruction: "Använd piltangenterna för att navigera i kalender",
        dayLabels: ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"],
        placeholder: "dd.mm.åååå",
        monthLabels: [
            "Januari",
            "Februari",
            "Mars",
            "April",
            "Maj",
            "Juni",
            "Juli",
            "Augusti",
            "September",
            "Oktober",
            "November",
            "December",
        ],
        monthLabelsShort: ["Jan", "Feb", "Mars", "April", "Maj", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dec"],
    },
};

const DatePickerDay = ({ selectedDay, focusedDay, today, day, language, onDaySelect, onKeyboardNavigation, focusedDayRef, inRange, }) => {
    const isToday = isEqual(day, today);
    const isFocused = isEqual(day, focusedDay);
    const isSelected = isEqual(day, selectedDay);
    const isDisabled = day.getMonth() !== focusedDay.getMonth();
    const isOutsideRange = !inRange;
    const { locale } = i18n[language];
    function handleClick(e) {
        onDaySelect(e, day);
    }
    return (h("button", { class: { "duet-date-table-button": true, outside: isOutsideRange, disabled: isDisabled, today: isToday }, tabIndex: isFocused ? 0 : -1, onClick: handleClick, onKeyDown: onKeyboardNavigation, "aria-selected": isSelected ? "true" : undefined, "aria-label": day.toLocaleDateString(locale), type: "button", ref: el => {
            if (isFocused && el && focusedDayRef) {
                focusedDayRef(el);
            }
        } }, day.getDate()));
};

function chunk(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}
const DatePickerMonth = ({ selectedDate, focusedDate, labelledById, language, min, max, onDateSelect, onKeyboardNavigation, focusedDayRef, onMouseDown, onFocusIn, }) => {
    const { dayLabels } = i18n[language];
    const today = new Date();
    const days = getViewOfMonth(focusedDate);
    return (h("table", { class: "duet-date-table", role: "grid", "aria-labelledby": labelledById, 
        // @ts-ignore
        onFocusin: onFocusIn, onMouseDown: onMouseDown },
        h("thead", null,
            h("tr", null, dayLabels.map(label => (h("th", { scope: "col" },
                h("span", { "aria-hidden": "true" }, label.substr(0, 2)),
                h("duet-visually-hidden", null, label)))))),
        h("tbody", null, chunk(days, 7).map(week => (h("tr", { class: "duet-date-table-row" }, week.map(day => (h("td", { class: "duet-date-table-cell" },
            h(DatePickerDay, { day: day, today: today, language: language, selectedDay: selectedDate, focusedDay: focusedDate, inRange: inRange(day, min, max), onDaySelect: onDateSelect, onKeyboardNavigation: onKeyboardNavigation, focusedDayRef: focusedDayRef }))))))))));
};

const duetDatePickerCss = "*,*::before,*::after{font-family:var(--font-family-text);-webkit-appearance:none;-moz-appearance:none;appearance:none;box-sizing:border-box;background:transparent;border:0;padding:0;margin:0}.duet-date,.duet-input-relative{position:relative;width:100%}.duet-date-button{-webkit-user-select:none;user-select:none;position:absolute;height:100%;width:var(--size-tappable-square);cursor:pointer;background:var(--color-gray-lightest);border-top-right-radius:var(--radius-default);border-bottom-right-radius:var(--radius-default);right:var(--size-form-border);top:var(--size-form-border);z-index:var(--z-index-mask);border-left:var(--size-form-border) solid var(--color-gray);color:var(--color-secondary);display:flex;align-items:center;justify-content:center}.duet-date-button::before{content:\"\";position:absolute;top:0;left:-6px;width:1px;height:100%;background:red}.duet-date-button[disabled]{background:var(--color-gray-lighter);cursor:default;border:0}.duet-date-button[disabled]::before{display:none}.duet-date-button duet-icon{transform:translateY(-1px)}.duet-date-button:active duet-icon{transform:translateY(0)}.duet-date-button:focus{outline:0;box-shadow:0 0 0 2px var(--color-primary);border-color:transparent;color:var(--color-primary)}.duet-date-dialog{transition:transform var(--transition-quickly), opacity var(--transition-quickly), visibility var(--transition-quickly);opacity:0;visibility:hidden;will-change:transform, opacity, visibility;transform:scale(0.96) translateZ(0) translateY(-20px);transform-origin:top right;position:absolute;z-index:var(--z-index-modal);width:100%;left:0;top:100%;display:flex}@media (max-width: 35.9375em){.duet-date-dialog{will-change:opacity, visibility;transition:opacity 400ms ease, visibility 400ms ease;transform-origin:bottom center;transform:translateZ(0);position:fixed;bottom:0;top:0;right:0;background:var(--color-secondary)}}.duet-date-dialog.active{opacity:1;visibility:visible;transform:scale(1) translateZ(0) translateY(0)}.duet-date-dialog.error{margin-top:var(--space-xx-small);top:calc(100% - var(--space-x-large))}.duet-date-dialog-wrapper{margin-top:var(--space-x-small);width:100%;margin-left:auto;max-width:310px;min-width:290px;transform:none;position:relative;z-index:var(--z-index-dropdown);border-radius:var(--radius-default);border:1px solid var(--color-gray-light);box-shadow:0 4px 10px 0 rgba(0, 41, 77, 0.15);padding:var(--space-medium) var(--space-medium) var(--space-large);background:var(--color-gray-lightest)}@media (max-width: 35.9375em){.duet-date-dialog-wrapper{border:0;transition:transform 400ms ease, opacity 400ms ease, visibility 400ms ease;opacity:0;visibility:hidden;min-height:25em;will-change:transform, opacity, visibility;transform:translateZ(0) translateY(100%);position:absolute;border-radius:var(--radius-sharp);border-top-left-radius:var(--radius-default);border-top-right-radius:var(--radius-default);bottom:0;left:0;margin:0;z-index:var(--z-index-modal);padding:0 8% var(--space-large);max-width:none}.active .duet-date-dialog-wrapper{opacity:1;visibility:visible;transform:translateZ(0) translateY(0)}}.duet-date-table{width:100%;font-size:var(--font-size-medium);font-weight:var(--font-weight-normal);line-height:var(--line-height-small);color:var(--color-secondary);border-collapse:collapse;border-spacing:0;text-align:center}.duet-date-table th{padding-bottom:var(--space-x-small);text-decoration:none;letter-spacing:1px;font-size:var(--font-size-x-small);line-height:var(--line-height-small);font-weight:var(--font-weight-semi-bold);text-transform:uppercase}.duet-date-table .duet-date-table-cell{text-align:center}.duet-date-table-button{font-size:var(--font-size-small);font-weight:var(--font-weight-normal);line-height:var(--line-height-small);font-family:var(--font-family-text);font-variant-numeric:tabular-nums;border-radius:var(--radius-circle);color:var(--color-secondary);height:var(--size-tappable-square)/1.3;width:var(--size-tappable-square)/1.3;cursor:pointer;text-align:center;display:inline-block;position:relative;z-index:var(--z-index-masked)}.duet-date-table-button:hover{background:var(--color-primary-lighter)}.duet-date-table-button.today{z-index:var(--z-index-mask);background:var(--color-primary-lightest);box-shadow:0 0 0 1px var(--color-primary);color:var(--color-primary-dark)}.duet-date-table-button[aria-selected=true],.duet-date-table-button:focus{box-shadow:none;outline:0;background:var(--color-primary);color:var(--color-gray-lightest)}.duet-date-table-button:active{z-index:var(--z-index-mask);box-shadow:0 0 5px var(--color-primary);background:var(--color-primary);color:var(--color-gray-lightest)}.duet-date-table-button:focus{z-index:var(--z-index-mask);box-shadow:0 0 5px var(--color-primary)}.duet-date-table-button.disabled{color:var(--color-gray-dark);background:transparent;box-shadow:none;cursor:default}.duet-date-table-button.outside{pointer-events:none;cursor:default;box-shadow:none;opacity:var(--opacity-75);background:var(--color-gray-lighter);box-shadow:none;color:var(--color-gray-dark)}.duet-date-dialog-header{margin-bottom:var(--space-medium);display:flex;width:100%;align-items:center;justify-content:space-between}.duet-date-dialog-buttons{white-space:nowrap}.duet-date-dialog-buttons button{color:var(--color-secondary);transition:background-color var(--transition-quickly);background:var(--color-gray-lighter);border-radius:var(--radius-circle);width:var(--size-tappable-square)/1.5;height:var(--size-tappable-square)/1.5;margin-left:var(--space-x-small);cursor:pointer;align-items:center;justify-content:center;display:inline-flex}.duet-date-dialog-buttons button duet-icon{display:block}@media (max-width: 35.9375em){.duet-date-dialog-buttons button{width:var(--size-tappable-square)/1.2;height:var(--size-tappable-square)/1.2}}.duet-date-dialog-buttons button:not(:disabled):hover{background:shade(var(--color-gray-lighter), 5%)}.duet-date-dialog-buttons button:focus{outline:0;box-shadow:0 0 0 2px var(--color-primary)}.duet-date-dialog-buttons button:active:focus{box-shadow:none;background:shade(var(--color-gray-lighter), 10%)}.duet-date-dialog-buttons button:disabled{cursor:default;opacity:var(--opacity-75);background:var(--color-gray-lighter);color:var(--color-gray-dark)}.duet-date-dialog-select{margin-top:var(--space-xx-small);position:relative;display:inline-flex}.duet-date-dialog-select .duet-date-dialog-select-label{border-radius:var(--radius-default);padding:0 var(--space-x-small);position:relative;pointer-events:none;align-items:center;display:flex;z-index:1;width:100%;font-size:var(--font-size-large);font-weight:var(--font-weight-semi-bold);line-height:var(--line-height-small);font-family:var(--font-family-heading);color:var(--color-secondary)}.duet-date-dialog-select span{margin-right:var(--space-xx-small)}.duet-date-dialog-select select{font-size:var(--font-size-medium);cursor:pointer;opacity:0;width:100%;height:100%;z-index:2;position:absolute;top:0;left:0}.duet-date-dialog-select select:focus+.duet-date-dialog-select-label{box-shadow:0 0 0 2px var(--color-primary)}.duet-date-dialog-mobile-header{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:120%;margin-left:-10%;margin-bottom:var(--space-large);padding:var(--space-small) var(--space-large);border-bottom:1px solid var(--color-gray);display:flex;position:relative;justify-content:space-between;align-items:center}@media (min-width: 36em){.duet-date-dialog-mobile-header{position:absolute;overflow:visible;top:calc(var(--space-x-small) * -1px);right:calc(var(--space-x-small) * -1px);width:auto;margin:0;border:0;padding:0}}.duet-date-dialog-mobile-header duet-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block;max-width:84%}@media (min-width: 36em){.duet-date-dialog-mobile-header duet-label{display:none}}.duet-date-picker-close{-webkit-appearance:none;appearance:none;padding:0;background:var(--color-gray-lighter);width:var(--size-icon-medium);height:var(--size-icon-medium);border-radius:var(--radius-circle);cursor:pointer;display:flex;align-items:center;justify-content:center}@media (min-width: 36em){.duet-date-picker-close{opacity:0}}.duet-date-picker-close:focus{outline:none;box-shadow:0 0 0 2px var(--color-primary)}@media (min-width: 36em){.duet-date-picker-close:focus{opacity:1}}.visually-hidden{clip:rect(1px, 1px, 1px, 1px);position:absolute;overflow:hidden;height:1px;width:1px;padding:0;border:0;top:0}";

function range(from, to) {
    var result = [];
    for (var i = 0; i <= to - from; i++) {
        result.push(from + i);
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
const DISALLOWED_CHARACTERS = /[^0-9\.]+/g;
const TRANSITION_MS = 400;
const DuetDatePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.duetChange = createEvent(this, "duetChange", 7);
        this.duetBlur = createEvent(this, "duetBlur", 7);
        this.duetFocus = createEvent(this, "duetFocus", 7);
        this.monthSelectId = createIdentifier("DuetDateMonth");
        this.yearSelectId = createIdentifier("DuetDateYear");
        this.dialogLabelId = createIdentifier("DuetDateLabel");
        this.initialTouchX = null;
        this.initialTouchY = null;
        this.activeFocus = false;
        this.open = false;
        this.focusedDay = new Date();
        /**
         * Name of the date picker input.
         */
        this.name = "";
        /**
         * Adds a unique identifier for the date picker input.
         */
        this.identifier = "";
        /**
         * Label for the date picker input.
         */
        this.label = "";
        /**
         * The currently active language. This setting changes the month/year/day
         * names and button labels as well as all screen reader labels.
         */
        this.language = "en";
        /**
         * Makes the date picker input component disabled. This prevents users from being able to
         * interact with the input, and conveys its inactive state to assistive technologies.
         */
        this.disabled = false;
        /**
         * Display the date picker input in error state along with an error message.
         */
        this.error = "";
        /**
         * Visually hide the label, but still show it to screen readers.
         */
        this.labelHidden = false;
        /**
         * Date value. Must be in IS0-8601 format: YYYY-MM-DD
         */
        this.value = "";
        /**
         * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
         * This setting can be used alone or together with the max property.
         */
        this.min = "";
        /**
         * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD
         * This setting can be used alone or together with the min property.
         */
        this.max = "";
        this.enableActiveFocus = () => {
            this.activeFocus = true;
        };
        this.disableActiveFocus = () => {
            this.activeFocus = false;
        };
        this.toggleOpen = (e) => {
            e.preventDefault();
            this.open ? this.hide(false) : this.show();
        };
        this.handleEscKey = (event) => {
            if (event.keyCode === keyCode.ESC) {
                this.hide();
            }
        };
        this.handleBlur = (event) => {
            event.stopPropagation();
            this.duetBlur.emit({
                component: "duet-date-picker",
            });
        };
        this.handleFocus = (event) => {
            event.stopPropagation();
            this.duetFocus.emit({
                component: "duet-date-picker",
            });
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
                this.hide();
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
            if (!inRange(day, parseISODate(this.min), parseISODate(this.max))) {
                return;
            }
            if (day.getMonth() === this.focusedDay.getMonth()) {
                this.setValue(day);
                this.hide();
            }
            else {
                this.setFocusedDay(day);
            }
        };
        this.handleMonthSelect = e => {
            this.setMonth(parseInt(e.target.value, 10));
        };
        this.handleYearSelect = e => {
            this.setYear(parseInt(e.target.value, 10));
        };
        this.handleInputChange = (e) => {
            const target = e.target;
            // clean up any invalid characters
            target.value = target.value.replace(DISALLOWED_CHARACTERS, "");
            const parsed = parseDate(target.value);
            if (parsed || target.value === "") {
                this.setValue(parsed);
            }
        };
        this.processFocusedDayNode = (element) => {
            this.focusedDayNode = element;
            if (this.activeFocus && this.open) {
                setTimeout(() => element.focus(), 0);
            }
        };
    }
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
        this.setFocusedDay(parseISODate(this.value) || new Date());
        clearTimeout(this.focusTimeoutId);
        this.focusTimeoutId = setTimeout(() => this.monthSelectNode.focus(), TRANSITION_MS);
    }
    /**
     * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
     * returning to the date picker's button. Default is true.
     */
    async hide(moveFocusToButton = true) {
        this.open = false;
        // in cases where calendar is quickly shown and hidden
        // we should avoid moving focus to the button
        clearTimeout(this.focusTimeoutId);
        if (moveFocusToButton) {
            // iOS VoiceOver needs to wait for all transitions to finish.
            setTimeout(() => this.datePickerButton.focus(), TRANSITION_MS);
        }
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
        this.setFocusedDay(startOfWeek(this.focusedDay));
    }
    endOfWeek() {
        this.setFocusedDay(endOfWeek(this.focusedDay));
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
    handleDocumentClick(e) {
        if (!this.open) {
            return;
        }
        const target = e.target;
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
            return;
        }
        this.hide(false);
    }
    /**
     * render() function
     * Always the last one in the class.
     */
    render() {
        const valueAsDate = parseISODate(this.value);
        const formattedDate = printDate(valueAsDate);
        const selectedYear = (valueAsDate || this.focusedDay).getFullYear();
        const focusedMonth = this.focusedDay.getMonth();
        const focusedYear = this.focusedDay.getFullYear();
        const text = i18n[this.language];
        const minDate = parseISODate(this.min);
        const maxDate = parseISODate(this.max);
        const prevMonthDisabled = minDate != null && minDate.getMonth() === focusedMonth && minDate.getFullYear() === focusedYear;
        const nextMonthDisabled = maxDate != null && maxDate.getMonth() === focusedMonth && maxDate.getFullYear() === focusedYear;
        return (h(Host, null, h("div", { class: "duet-date" }, h(DatePickerInput, { value: formattedDate, onInput: this.handleInputChange, onBlur: this.handleBlur, onFocus: this.handleFocus, onClick: this.toggleOpen, name: this.name, disabled: this.disabled, error: this.error, role: this.role, labelHidden: this.labelHidden, placeholder: text.placeholder, inputLabel: this.label, buttonLabel: text.buttonLabel, identifier: this.identifier, buttonRef: element => (this.datePickerButton = element), inputRef: element => (this.datePickerInput = element) })), h("div", { class: {
                "duet-date-dialog": true,
                error: !!this.error,
                active: this.open,
            }, role: "dialog", "aria-modal": "true", "aria-labelledby": this.dialogLabelId, onTouchMove: this.handleTouchMove, onTouchStart: this.handleTouchStart, onTouchEnd: this.handleTouchEnd }, h("div", { class: "duet-date-dialog-wrapper", onKeyDown: this.handleEscKey, ref: element => (this.dialogWrapperNode = element) }, h("div", { class: "duet-date-dialog-mobile-header", onFocusin: this.disableActiveFocus }, h("label", null, this.label), h("button", { class: "duet-date-picker-close", ref: element => (this.firstFocusableElement = element), onKeyDown: this.handleFirstFocusableKeydown, onClick: () => this.hide(), "aria-label": text.closeLabel, type: "button" }, text.closeLabel)), h("div", { class: "duet-date-dialog-header", onFocusin: this.disableActiveFocus }, h("div", { class: "duet-date-dialog-dropdowns" }, h("div", { class: "visually-hidden" }, h("h2", { id: this.dialogLabelId, "aria-live": "polite" }, text.monthLabels[focusedMonth], " ", this.focusedDay.getFullYear())), h("label", { htmlFor: this.monthSelectId, class: "visually-hidden" }, text.monthSelectLabel), h("div", { class: "duet-date-dialog-select" }, h("select", { id: this.monthSelectId, class: "duet-date-month-select", ref: element => (this.monthSelectNode = element), onChange: this.handleMonthSelect }, text.monthLabels.map((month, i) => (h("option", { value: i, selected: i === focusedMonth }, month))))), h("label", { htmlFor: this.yearSelectId, class: "visually-hidden" }, text.yearSelectLabel), h("div", { class: "duet-date-dialog-select" }, h("select", { id: this.yearSelectId, class: "duet-date-year-select", onChange: this.handleYearSelect }, range(selectedYear - 10, selectedYear + 10).map(year => (h("option", { selected: year === focusedYear }, year)))))), h("div", { class: "duet-date-dialog-buttons" }, h("button", { class: "duet-date-dialog-prev", "aria-label": text.prevMonthLabel, onClick: this.handlePreviousMonthClick, disabled: prevMonthDisabled, type: "button" }, text.prevMonthLabel), h("button", { class: "duet-date-dialog-next", "aria-label": text.nextMonthLabel, onClick: this.handleNextMonthClick, disabled: nextMonthDisabled, type: "button" }, text.nextMonthLabel))), h(DatePickerMonth, { selectedDate: valueAsDate, focusedDate: this.focusedDay, onDateSelect: this.handleDaySelect, onKeyboardNavigation: this.handleKeyboardNavigation, labelledById: this.dialogLabelId, language: this.language, focusedDayRef: this.processFocusedDayNode, min: minDate, max: maxDate }), h("div", { class: "visually-hidden", "aria-live": "polite" }, text.keyboardInstruction)))));
    }
    get element() { return getElement(this); }
};
DuetDatePicker.style = duetDatePickerCss;

export { DuetDatePicker as duet_date_picker };
