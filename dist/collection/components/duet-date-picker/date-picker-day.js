import { h } from "@stencil/core";
import { isEqual, isEqualMonth } from "./date-utils";
export const DatePickerDay = ({ focusedDay, today, day, onDaySelect, onKeyboardNavigation, focusedDayRef, disabled, inRange, isSelected, dateFormatter, }) => {
  const isToday = isEqual(day, today);
  const isMonth = isEqualMonth(day, focusedDay);
  const isFocused = isEqual(day, focusedDay);
  const isOutsideRange = !inRange;
  function handleClick(e) {
    onDaySelect(e, day);
  }
  return (h("button", { class: {
      "duet-date__day": true,
      "is-outside": isOutsideRange,
      "is-today": isToday,
      "is-month": isMonth,
      "is-disabled": disabled,
    }, tabIndex: isFocused ? 0 : -1, onClick: handleClick, onKeyDown: onKeyboardNavigation, "aria-disabled": disabled ? "true" : undefined, disabled: isOutsideRange, type: "button", "aria-pressed": isSelected ? "true" : "false", ref: el => {
      if (isFocused && el && focusedDayRef) {
        focusedDayRef(el);
      }
    } },
    h("span", { "aria-hidden": "true" }, day.getDate()),
    h("span", { class: "duet-date__vhidden" }, dateFormatter.format(day))));
};
