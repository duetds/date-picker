import { FunctionalComponent } from "../../stencil-public-runtime";
import { DatePickerDayProps } from "./date-picker-day";
import { DuetLanguage } from "./duet-date-picker";
declare type DatePickerMonthProps = {
    selectedDate: Date;
    focusedDate: Date;
    labelledById: string;
    language: DuetLanguage;
    min?: Date;
    max?: Date;
    onDateSelect: DatePickerDayProps["onDaySelect"];
    onKeyboardNavigation: DatePickerDayProps["onKeyboardNavigation"];
    focusedDayRef: (element: HTMLButtonElement) => void;
    onFocusIn?: (e: FocusEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
};
export declare const DatePickerMonth: FunctionalComponent<DatePickerMonthProps>;
export {};
