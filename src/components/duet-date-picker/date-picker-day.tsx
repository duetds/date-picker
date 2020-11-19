import { h, FunctionalComponent } from "@stencil/core"
import { isEqual, isEqualMonth } from "./date-utils"

export type DatePickerDayProps = {
  focusedDay: Date
  today: Date
  day: Date
  disabled: boolean
  inRange: boolean
  isSelected: boolean
  dateFormatter: Intl.DateTimeFormat
  onDaySelect: (event: MouseEvent, day: Date) => void
  onKeyboardNavigation: (event: KeyboardEvent) => void
  focusedDayRef?: (element: HTMLButtonElement) => void
}

export const DatePickerDay: FunctionalComponent<DatePickerDayProps> = ({
  focusedDay,
  today,
  day,
  onDaySelect,
  onKeyboardNavigation,
  focusedDayRef,
  disabled,
  inRange,
  isSelected,
  dateFormatter,
}) => {
  const isToday = isEqual(day, today)
  const isMonth = isEqualMonth(day, focusedDay)
  const isFocused = isEqual(day, focusedDay)
  const isOutsideRange = !inRange

  function handleClick(e) {
    onDaySelect(e, day)
  }

  return (
    <button
      class={{
        "duet-date__day": true,
        "is-outside": isOutsideRange,
        "is-disabled": disabled,
        "is-today": isToday,
        "is-month": isMonth,
      }}
      tabIndex={isFocused ? 0 : -1}
      onClick={handleClick}
      onKeyDown={onKeyboardNavigation}
      disabled={isOutsideRange || disabled}
      type="button"
      aria-pressed={isSelected ? "true" : "false"}
      ref={el => {
        if (isFocused && el && focusedDayRef) {
          focusedDayRef(el)
        }
      }}
    >
      <span aria-hidden="true">{day.getDate()}</span>
      <span class="duet-date__vhidden">{dateFormatter.format(day)}</span>
    </button>
  )
}
