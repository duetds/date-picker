import { h, FunctionalComponent } from "@stencil/core"
import { DatePickerDay, DatePickerDayProps } from "./date-picker-day"
import { getViewOfMonth, inRange } from "./date-utils"
import { DuetLocalisedText, DuetDateFormatter } from "./types"

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
  localization: DuetLocalisedText
  min?: Date
  max?: Date
  dateFormatter: DuetDateFormatter
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
  localization,
  min,
  max,
  dateFormatter,
  onDateSelect,
  onKeyboardNavigation,
  focusedDayRef,
  onMouseDown,
  onFocusIn,
}) => {
  const today = new Date()
  const days = getViewOfMonth(focusedDate)

  return (
    <table
      class="duet-date__table"
      role="grid"
      aria-labelledby={labelledById}
      // @ts-ignore
      onFocusin={onFocusIn}
      onMouseDown={onMouseDown}
    >
      <thead>
        <tr>
          {localization.dayLabels.map(label => (
            <th class="duet-date__table-header" scope="col">
              <span aria-hidden="true">{label.substr(0, 2)}</span>
              <span class="duet-date__vhidden">{label}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {chunk(days, 7).map(week => (
          <tr class="duet-date__row">
            {week.map(day => (
              <td class="duet-date__cell">
                <DatePickerDay
                  day={day}
                  today={today}
                  selectedDay={selectedDate}
                  focusedDay={focusedDate}
                  inRange={inRange(day, min, max)}
                  onDaySelect={onDateSelect}
                  dateFormatter={dateFormatter}
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
