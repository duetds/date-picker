import { DuetLanguage } from "./duet-date-picker"

type MonthsLabels = [string, string, string, string, string, string, string, string, string, string, string, string]
type DayLabels = [string, string, string, string, string, string, string]
type I18nText = {
  locale: string
  buttonLabel: string
  nextMonthLabel: string
  prevMonthLabel: string
  monthSelectLabel: string
  yearSelectLabel: string
  keyboardInstruction: string
  closeLabel: string
  dayLabels: DayLabels
  selected: string
  placeholder: string
  calendarHeading: string
  monthLabels: MonthsLabels
  monthLabelsShort: MonthsLabels
}

const i18n: Record<DuetLanguage, I18nText> = {
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
    calendarHeading: "Choose a date",
    selected: "Selected date is",
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
    calendarHeading: "Valitse päivämäärä",
    selected: "Valittu päivämäärä on",
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
    calendarHeading: "Välj datum",
    selected: "Valt datum är",
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
}

export default i18n
