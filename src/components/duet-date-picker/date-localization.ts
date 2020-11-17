type MonthsNames = [string, string, string, string, string, string, string, string, string, string, string, string]
type DayNames = [string, string, string, string, string, string, string]

export type DuetLocalizedText = {
  buttonLabel: string
  placeholder: string
  selectedDateMessage: string
  prevMonthLabel: string
  nextMonthLabel: string
  monthSelectLabel: string
  yearSelectLabel: string
  closeLabel: string
  keyboardInstruction: string
  calendarHeading: string
  dayNames: DayNames
  monthNames: MonthsNames
  monthNamesShort: MonthsNames
  locale: string | string[]
}

const localization: DuetLocalizedText = {
  buttonLabel: "Choose date",
  placeholder: "YYYY-MM-DD",
  selectedDateMessage: "Selected date is",
  prevMonthLabel: "Previous month",
  nextMonthLabel: "Next month",
  monthSelectLabel: "Month",
  yearSelectLabel: "Year",
  closeLabel: "Close window",
  keyboardInstruction: "You can use arrow keys to navigate dates",
  calendarHeading: "Choose a date",
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  monthNames: [
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
  monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  locale: "en-GB",
}

export default localization
