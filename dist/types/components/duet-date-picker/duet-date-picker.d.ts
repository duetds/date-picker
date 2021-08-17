import { ComponentInterface, EventEmitter } from "../../stencil-public-runtime";
import { DaysOfWeek } from "./date-utils";
import { DuetLocalizedText } from "./date-localization";
import { DuetDateAdapter } from "./date-adapter";
export declare type DuetDatePickerChangeEvent = {
  component: "duet-date-picker";
  valueAsDate: Date;
  value: string;
};
export declare type DuetDatePickerFocusEvent = {
  component: "duet-date-picker";
};
export declare type DuetDatePickerOpenEvent = {
  component: "duet-date-picker";
};
export declare type DuetDatePickerCloseEvent = {
  component: "duet-date-picker";
};
export declare type DuetDatePickerDirection = "left" | "right";
export declare type DateDisabledPredicate = (date: Date) => boolean;
export declare class DuetDatePicker implements ComponentInterface {
  /**
   * Own Properties
   */
  private monthSelectId;
  private yearSelectId;
  private dialogLabelId;
  private datePickerButton;
  private datePickerInput;
  private firstFocusableElement;
  private monthSelectNode;
  private dialogWrapperNode;
  private focusedDayNode;
  private focusTimeoutId;
  private initialTouchX;
  private initialTouchY;
  /**
   * Whilst dateAdapter is used for handling the formatting/parsing dates in the input,
   * these are used to format dates exclusively for the benefit of screen readers.
   *
   * We prefer DateTimeFormat over date.toLocaleDateString, as the former has
   * better performance when formatting large number of dates. See:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#Performance
   */
  private dateFormatShort;
  /**
   * Reference to host HTML element.
   */
  element: HTMLElement;
  /**
   * State() variables
   */
  activeFocus: boolean;
  focusedDay: Date;
  open: boolean;
  /**
   * Public Property API
   */
  /**
   * Name of the date picker input.
   */
  name: string;
  /**
   * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
   */
  identifier: string;
  /**
   * Makes the date picker input component disabled. This prevents users from being able to
   * interact with the input, and conveys its inactive state to assistive technologies.
   */
  disabled: boolean;
  /**
   * Defines a specific role attribute for the date picker input.
   */
  role: string;
  /**
   * Forces the opening direction of the calendar modal to be always left or right.
   * This setting can be useful when the input is smaller than the opening date picker
   * would be as by default the picker always opens towards right.
   */
  direction: DuetDatePickerDirection;
  /**
   * Should the input be marked as required?
   */
  required: boolean;
  /**
   * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  value: string;
  /**
   * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the max property.
   */
  min: string;
  /**
   * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the min property.
   */
  max: string;
  /**
   * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
   * Default is Monday.
   */
  firstDayOfWeek: DaysOfWeek;
  /**
   * Button labels, day names, month names, etc, used for localization.
   * Default is English.
   */
  localization: DuetLocalizedText;
  /**
   * Date adapter, for custom parsing/formatting.
   * Must be object with a `parse` function which accepts a `string` and returns a `Date`,
   * and a `format` function which accepts a `Date` and returns a `string`.
   * Default is IS0-8601 parsing and formatting.
   */
  dateAdapter: DuetDateAdapter;
  /**
   * Controls which days are disabled and therefore disallowed.
   * For example, this can be used to disallow selection of weekends.
   */
  isDateDisabled: DateDisabledPredicate;
  /**
   * Events section.
   */
  /**
   * Event emitted when a date is selected.
   */
  duetChange: EventEmitter<DuetDatePickerChangeEvent>;
  /**
   * Event emitted the date picker input is blurred.
   */
  duetBlur: EventEmitter<DuetDatePickerFocusEvent>;
  /**
   * Event emitted the date picker input is focused.
   */
  duetFocus: EventEmitter<DuetDatePickerFocusEvent>;
  /**
   * Event emitted the date picker modal is opened.
   */
  duetOpen: EventEmitter<DuetDatePickerOpenEvent>;
  /**
   * Event emitted the date picker modal is closed.
   */
  duetClose: EventEmitter<DuetDatePickerCloseEvent>;
  connectedCallback(): void;
  createDateFormatters(): void;
  /**
   * Component event handling.
   */
  handleDocumentClick(e: MouseEvent): void;
  /**
   * Public methods API
   */
  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  setFocus(): Promise<void>;
  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  show(): Promise<void>;
  /**
   * Never hide the calendar modal.
   */
  hide(option?: boolean): Promise<boolean>;
  /**
   * Local methods.
   */
  private enableActiveFocus;
  private disableActiveFocus;
  private addDays;
  private addMonths;
  private addYears;
  private startOfWeek;
  private endOfWeek;
  private setMonth;
  private setYear;
  private setFocusedDay;
  private handleEscKey;
  private handleTouchStart;
  private handleTouchMove;
  private handleTouchEnd;
  private handleNextMonthClick;
  private handlePreviousMonthClick;
  private handleFirstFocusableKeydown;
  private handleKeyboardNavigation;
  private handleDaySelect;
  private handleMonthSelect;
  private handleYearSelect;
  private setValue;
  private processFocusedDayNode;
  /**
   * render() function
   * Always the last one in the class.
   */
  render(): any;
}
