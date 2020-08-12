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
