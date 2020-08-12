import { h, FunctionalComponent } from "@stencil/core"
import { DatePickerDay, DatePickerDayProps } from "./date-picker-day"
import { getViewOfMonth, inRange } from "./date-utils"
import { DuetLanguage } from "./duet-date-picker"
import i18n from "./date-i18n"

function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result = []

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize))
  }

  return result
}

type DatePickerMonthProps = {
  selectedDate: Date
  focusedDate: Date
  labelledById: string
  language: DuetLanguage
  min?: Date
  max?: Date
  onDateSelect: DatePickerDayProps["onDaySelect"]
  onKeyboardNavigation: DatePickerDayProps["onKeyboardNavigation"]
  focusedDayRef: (element: HTMLButtonElement) => void
  onFocusIn?: (e: FocusEvent) => void
  onMouseDown?: (e: MouseEvent) => void
}

export const DatePickerMonth: FunctionalComponent<DatePickerMonthProps> = ({
  selectedDate,
  focusedDate,
  labelledById,
  language,
  min,
  max,
  onDateSelect,
  onKeyboardNavigation,
  focusedDayRef,
  onMouseDown,
  onFocusIn,
}) => {
  const { dayLabels } = i18n[language]
  const today = new Date()
  const days = getViewOfMonth(focusedDate)

  return (
    <table
      class="duet-date-table"
      role="grid"
      aria-labelledby={labelledById}
      // @ts-ignore
      onFocusin={onFocusIn}
      onMouseDown={onMouseDown}
    >
      <thead>
        <tr>
          {dayLabels.map(label => (
            <th scope="col">
              <span aria-hidden="true">{label.substr(0, 2)}</span>
              <span class="visually-hidden">{label}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {chunk(days, 7).map(week => (
          <tr class="duet-date-table-row">
            {week.map(day => (
              <td class="duet-date-table-cell">
                <DatePickerDay
                  day={day}
                  today={today}
                  language={language}
                  selectedDay={selectedDate}
                  focusedDay={focusedDate}
                  inRange={inRange(day, min, max)}
                  onDaySelect={onDateSelect}
                  onKeyboardNavigation={onKeyboardNavigation}
                  focusedDayRef={focusedDayRef}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
