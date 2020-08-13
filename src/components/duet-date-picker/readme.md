# duet-date-picker



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                                                                               | Type                   | Default     |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `disabled`   | `disabled`   | Makes the date picker input component disabled. This prevents users from being able to interact with the input, and conveys its inactive state to assistive technologies. | `boolean`              | `false`     |
| `identifier` | `identifier` | Adds a unique identifier for the date picker input.                                                                                                                       | `string`               | `""`        |
| `language`   | `language`   | The currently active language. This setting changes the month/year/day names and button labels as well as all screen reader labels.                                       | `"en" \| "fi" \| "sv"` | `"en"`      |
| `max`        | `max`        | Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD This setting can be used alone or together with the min property.                               | `string`               | `""`        |
| `min`        | `min`        | Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD. This setting can be used alone or together with the max property.                              | `string`               | `""`        |
| `name`       | `name`       | Name of the date picker input.                                                                                                                                            | `string`               | `""`        |
| `role`       | `role`       | Defines a specific role attribute for the date picker input.                                                                                                              | `string`               | `undefined` |
| `value`      | `value`      | Date value. Must be in IS0-8601 format: YYYY-MM-DD                                                                                                                        | `string`               | `""`        |


## Events

| Event        | Description                                     | Type                                                                                |
| ------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| `duetBlur`   | Event emitted the date picker input is blurred. | `CustomEvent<{ component: "duet-date-picker"; }>`                                   |
| `duetChange` | Event emitted when a date is selected.          | `CustomEvent<{ component: "duet-date-picker"; valueAsDate: Date; value: string; }>` |
| `duetFocus`  | Event emitted the date picker input is focused. | `CustomEvent<{ component: "duet-date-picker"; }>`                                   |


## Methods

### `hide(moveFocusToButton?: boolean) => Promise<void>`

Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
returning to the date picker's button. Default is true.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the date picker's input. Use this method instead of the global `focus()`.

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show the calendar modal, moving focus to the calendar inside.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
