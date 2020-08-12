import { DuetLanguage } from "./duet-date-picker";
declare type MonthsLabels = [string, string, string, string, string, string, string, string, string, string, string, string];
declare type DayLabels = [string, string, string, string, string, string, string];
declare type I18nText = {
    locale: string;
    buttonLabel: string;
    nextMonthLabel: string;
    prevMonthLabel: string;
    monthSelectLabel: string;
    yearSelectLabel: string;
    keyboardInstruction: string;
    closeLabel: string;
    dayLabels: DayLabels;
    placeholder: string;
    monthLabels: MonthsLabels;
    monthLabelsShort: MonthsLabels;
};
declare const i18n: Record<DuetLanguage, I18nText>;
export default i18n;
