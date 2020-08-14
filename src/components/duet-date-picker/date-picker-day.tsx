import { h, FunctionalComponent } from "@stencil/core"
import { DuetLanguage } from "./duet-date-picker"
import { isEqual } from "./date-utils"
import i18n from "./date-i18n"

export type DatePickerDayProps = {
  selectedDay: Date
  focusedDay: Date
  today: Date
  language: DuetLanguage
  day: Date
  inRange: boolean
  onDaySelect: (event: MouseEvent, day: Date) => void
  onKeyboardNavigation: (event: KeyboardEvent) => void
  focusedDayRef?: (element: HTMLButtonElement) => void
}

export const DatePickerDay: FunctionalComponent<DatePickerDayProps> = ({
  selectedDay,
  focusedDay,
  today,
  day,
  language,
  onDaySelect,
  onKeyboardNavigation,
  focusedDayRef,
  inRange,
}) => {
  const isToday = isEqual(day, today)
  const isFocused = isEqual(day, focusedDay)
  const isSelected = isEqual(day, selectedDay)
  const isDisabled = day.getMonth() !== focusedDay.getMonth()
  const isOutsideRange = !inRange
  const { locale } = i18n[language]

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
      aria-selected={isSelected ? "true" : undefined}
      aria-label={day.toLocaleDateString(locale)}
      disabled={isOutsideRange || isDisabled}
      type="button"
      ref={el => {
        if (isFocused && el && focusedDayRef) {
          focusedDayRef(el)
        }
      }}
    >
      {day.getDate()}
    </button>
  )
}
