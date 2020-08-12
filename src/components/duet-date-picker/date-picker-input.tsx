import { h, FunctionalComponent } from "@stencil/core"

type DatePickerInputProps = {
  value: string
  placeholder: string
  name: string
  identifier: string
  buttonLabel: string
  inputLabel: string
  disabled: boolean
  error: string
  role: string
  labelHidden: boolean
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
  inputLabel,
  value,
  identifier,
  disabled,
  error,
  role,
  labelHidden,
  buttonRef,
  inputRef,
  onInput,
  onBlur,
  onFocus,
}) => {
  return (
    <div class="duet-date-input">
      <div
        class={{
          "duet-input-container": true,
          "duet-label-hidden": labelHidden,
          "has-error": !!error,
        }}
      >
        <label id="foo" htmlFor={identifier}>
          {inputLabel}
        </label>
        <div class="duet-input-relative">
          <input
            name={name}
            value={value}
            class="duet-input"
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
            class={{ "duet-date-button": true, "duet-no-label": labelHidden }}
            onClick={onClick}
            disabled={disabled}
            ref={buttonRef}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z" />
            </svg>
            <span class="visually-hidden">{buttonLabel}</span>
          </button>
        </div>
      </div>
      <span class="duet-input-help" id="foo" aria-live="assertive" aria-relevant="additions removals">
        {error && <span>{error}</span>}
      </span>
    </div>
  )
}
