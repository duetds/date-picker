import { ComponentInterface, EventEmitter } from "../../stencil-public-runtime";
export declare type DuetLanguage = "fi" | "en" | "sv";
export declare type DuetDatePickerChangeEvent = {
    component: "duet-date-picker";
    valueAsDate: Date;
    value: string;
};
export declare type DuetDatePickerFocusEvent = {
    component: "duet-date-picker";
};
export declare class DuetDatePicker implements ComponentInterface {
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
    activeFocus: boolean;
    open: boolean;
    focusedDay: Date;
    /**
     * Reference to host HTML element.
     */
    element: HTMLElement;
    /**
     * Name of the date picker input.
     */
    name: string;
    /**
     * Adds a unique identifier for the date picker input.
     */
    identifier: string;
    /**
     * Label for the date picker input.
     */
    label: string;
    /**
     * The currently active language. This setting changes the month/year/day
     * names and button labels as well as all screen reader labels.
     */
    language: DuetLanguage;
    /**
     * Makes the date picker input component disabled. This prevents users from being able to
     * interact with the input, and conveys its inactive state to assistive technologies.
     */
    disabled: boolean;
    /**
     * Display the date picker input in error state along with an error message.
     */
    error: string;
    /**
     * Visually hide the label, but still show it to screen readers.
     */
    labelHidden: boolean;
    /**
     * Defines a specific role attribute for the date picker input.
     */
    role: string;
    /**
     * Date value. Must be in IS0-8601 format: YYYY-MM-DD
     */
    value: string;
    /**
     * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
     * This setting can be used alone or together with the max property.
     */
    min: string;
    /**
     * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD
     * This setting can be used alone or together with the min property.
     */
    max: string;
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
     * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
     */
    setFocus(): Promise<void>;
    /**
     * Show the calendar modal, moving focus to the calendar inside.
     */
    show(): Promise<void>;
    /**
     * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
     * returning to the date picker's button. Default is true.
     */
    hide(moveFocusToButton?: boolean): Promise<void>;
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
    private toggleOpen;
    private handleEscKey;
    private handleBlur;
    private handleFocus;
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
    private handleInputChange;
    private setValue;
    handleDocumentClick(e: MouseEvent): void;
    private processFocusedDayNode;
    /**
     * render() function
     * Always the last one in the class.
     */
    render(): any;
}
