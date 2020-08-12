import { h, FunctionalComponent } from "@stencil/core"

type DatePickerInputProps = {
  value: string
  placeholder: string
  name: string
  identifier: string
  buttonLabel: string
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
    <div class="duet-date__input">
      <input
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
      <button
        aria-label={buttonLabel}
        class="duet-date__toggle"
        onClick={onClick}
        disabled={disabled}
        ref={buttonRef}
        type="button"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z" />
        </svg>
      </button>
    </div>
  )
}
