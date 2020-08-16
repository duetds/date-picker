import { h, FunctionalComponent } from "@stencil/core"

type DatePickerInputProps = {
  value: string
  placeholder: string
  name: string
  identifier: string
  buttonLabel: string
  selectedLabel: string
  disabled: boolean
  role: string
  onClick: (event: MouseEvent) => void
  onInput: (event: InputEvent) => void
  onBlur: (event: FocusEvent) => void
  onFocus: (event: FocusEvent) => void
  buttonRef: (element: HTMLButtonElement) => void
  inputRef: (element: HTMLInputElement) => void
}

export const DatePickerInput: FunctionalComponent<DatePickerInputProps> = ({
  onClick,
  placeholder,
  buttonLabel,
  selectedLabel,
  name,
  value,
  identifier,
  disabled,
  role,
  buttonRef,
  inputRef,
  onInput,
  onBlur,
  onFocus,
}) => {
  return (
    <div class="duet-date__input-wrapper">
      <input
        class="duet-date__input"
        name={name}
        value={value}
        placeholder={placeholder}
        id={identifier}
        disabled={disabled}
        role={role}
        aria-autocomplete="none"
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
        ref={inputRef}
      />
      <button class="duet-date__toggle" onClick={onClick} disabled={disabled} ref={buttonRef} type="button">
        <svg aria-hidden="true" height="24" viewBox="0 0 21 21" width="24" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd" transform="translate(2 2)">
            <path
              d="m2.5.5h12c1.1045695 0 2 .8954305 2 2v12c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="m.5 4.5h16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <g fill="currentColor">
              <circle cx="8.5" cy="8.5" r="1" />
              <circle cx="4.5" cy="8.5" r="1" />
              <circle cx="12.5" cy="8.5" r="1" />
              <circle cx="8.5" cy="12.5" r="1" />
              <circle cx="4.5" cy="12.5" r="1" />
              <circle cx="12.5" cy="12.5" r="1" />
            </g>
          </g>
        </svg>
        <span class="duet-date__vhidden">
          {buttonLabel}
          {value && (
            <span>
              , {selectedLabel} {value}
            </span>
          )}
        </span>
      </button>
    </div>
  )
}
