declare type MonthsNames = [string, string, string, string, string, string, string, string, string, string, string, string];
declare type DayNames = [string, string, string, string, string, string, string];
export declare type DuetLocalizedText = {
  buttonLabel: string;
  placeholder: string;
  selectedDateMessage: string;
  prevMonthLabel: string;
  nextMonthLabel: string;
  monthSelectLabel: string;
  yearSelectLabel: string;
  closeLabel: string;
  calendarHeading: string;
  dayNames: DayNames;
  monthNames: MonthsNames;
  monthNamesShort: MonthsNames;
  locale: string | string[];
};
declare const localization: DuetLocalizedText;
export default localization;
