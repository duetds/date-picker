import { h, FunctionalComponent } from "@stencil/core"
import { isEqual } from "./date-utils"

export type DatePickerDayProps = {
  focusedDay: Date
  today: Date
  day: Date
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
  inRange,
  isSelected,
  dateFormatter,
}) => {
  const isToday = isEqual(day, today)
  const isFocused = isEqual(day, focusedDay)
  const isDisabled = day.getMonth() !== focusedDay.getMonth()
  const isOutsideRange = !inRange

  function handleClick(e) {
    onDaySelect(e, day)
  }

  return (
    <button
      class={{
        "duet-date__day": true,
        "is-outside": isOutsideRange,
        "is-disabled": isDisabled,
        "is-today": isToday,
      }}
      tabIndex={isFocused ? 0 : -1}
      onClick={handleClick}
      onKeyDown={onKeyboardNavigation}
      disabled={isOutsideRange || isDisabled}
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
