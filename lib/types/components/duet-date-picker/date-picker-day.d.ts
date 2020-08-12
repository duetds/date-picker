import { FunctionalComponent } from "../../stencil-public-runtime";
import { DuetLanguage } from "./duet-date-picker";
export declare type DatePickerDayProps = {
    selectedDay: Date;
    focusedDay: Date;
    today: Date;
    language: DuetLanguage;
    day: Date;
    inRange: boolean;
    onDaySelect: (event: MouseEvent, day: Date) => void;
    onKeyboardNavigation: (event: KeyboardEvent) => void;
    focusedDayRef?: (element: HTMLButtonElement) => void;
};
export declare const DatePickerDay: FunctionalComponent<DatePickerDayProps>;
