import { FunctionalComponent } from "../../stencil-public-runtime";
export declare type DatePickerDayProps = {
  focusedDay: Date;
  today: Date;
  day: Date;
  disabled: boolean;
  inRange: boolean;
  isSelected: boolean;
  dateFormatter: Intl.DateTimeFormat;
  onDaySelect: (event: MouseEvent, day: Date) => void;
  onKeyboardNavigation: (event: KeyboardEvent) => void;
  focusedDayRef?: (element: HTMLElement) => void;
};
export declare const DatePickerDay: FunctionalComponent<DatePickerDayProps>;
