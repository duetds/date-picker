![Dependencies status](https://david-dm.org/duetds/date-picker.svg) ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)


# Duet Date Picker

### Duet Date Picker is an open source version of Duet Design System’s Date Picker. It’s a Web Component that lets user pick a date using a special calendar like date picker interface. 

Duet Date Picker can be implemented and used across any JavaScript framework or no framework at all. We accomplish this by using standardized web platform APIs and Web Components.

**[Read more about Duet](https://www.duetds.com)**

## Getting started

Integrating Duet Date Picker to a project without a JavaScript framework is very straight forward. If you’re working on a simple HTML page, you can start using the components immediately by adding this script tag to the `<head>`:

  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.0.0/lib/duet/duet.esm.js"></script>
  ```
  
  Once included, the component can be used in your markup like any other regular HTML element:
  
  ```html
  <label for="date">Choose a date</label>
  <duet-date-picker identifier="date"></duet-date-picker>
  ```

## Installation

Before moving further, please make sure you have [Node.js](https://nodejs.org/en/) installed on your machine. You can install the latest version through [their website](https://nodejs.org/en/). If you’re planning on using Duet Components in a project that doesn’t yet use [Node Package Manager](https://www.npmjs.com), you’ll have to first create a [package.json](https://docs.npmjs.com/files/package.json) file. To do so, run <code>npm init</code> and follow the steps provided.

Once finished, you can install Duet Date Picker by running:

```shell
# WEB COMPONENT for HTML, Ember, Vue.js, React, Angular and Vanilla JS:
npm install @duetds/date-picker
```

## Usage with basic HTML

Once you’ve installed `@duetds/date-picker` package into your project, it’s recommended to create a copy task that copies Duet Date Picker component from `node_modules` to a location you’ve specified. One such tool that can do this is [NCP](https://www.npmjs.com/package/ncp). You can install `ncp` by running:

```shell
npm install ncp --save-dev
```

Once installed, add a script to your package.json that copies the component library from Duet’s package into a location you’ve specified:

```json
"scripts": {
  "copy:components": "ncp node_modules/@duetds/date-picker/lib src/SPECIFY_PATH"
}
```

You can call this script while starting up your app to make sure you’ve always got the latest code copied over. If you’re using an UNIX-like environment, you can use `&` as the separator:

```json
"start": "copy:components & dev"
```

Otherwise, if you need a cross-platform solution, use [npm-run-all module](https://www.npmjs.com/package/npm-run-all):

```json
"start": "npm-run-all copy:components dev"
```

Once you have a copy task in place and have copied the component library over, you can put script tags similar to these in the `<head>` of your `index.html`:

```html
<script type="module" src="SPECIFY_YOUR_PATH/duet.esm.js"></script>
```

Once included, Duet Date Picker can be used in your basic HTML markup as in the following example:

```html
<label for="date">Choose a date</label>
<duet-date-picker identifier="date"></duet-date-picker>
```

<strong>Please note:</strong> we favor the usage of CDN like JSDelivr over the above approach. Scroll to the top of the readme to find the correct script tags.

## Usage with Angular

To get started, first install Duet Date Picker package:

```shell
npm install @duetds/date-picker
```

Before you can use this Web Component in Angular, you must import and add Angular’s `CUSTOM_ELEMENTS_SCHEMA`. This allows the use of Web Components in HTML markup, without the compiler producing errors. The `CUSTOM_ELEMENTS_SCHEMA` needs to be included in any module that uses custom elements. Typically, this can be added to `AppModule`:

```js
// ...
// Import custom elements schema
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@NgModule({
  // ...
  // Add custom elements schema to NgModule
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

The final step is to load and register Duet Date Picker in the browser. `@duetds/date-picker` includes a main function that handles this. That function is called `defineCustomElements()` and it needs to be called once during the bootstrapping of your application. One convenient place to do this is in `main.ts` as such:

```js
// Import Duet Date Picker
import { defineCustomElements } from "@duetds/date-picker/lib/loader";
// ...
// Register Duet Date Picker
defineCustomElements(window);
```

Once included, Duet Date Picker can be used in your HTML markup as in the following example:

```html
<label for="date">Choose a date</label>
<duet-date-picker identifier="date"></duet-date-picker>
```

### Accessing using ViewChild and ViewChildren

Once included, components could also be referenced in your code using `ViewChild` and `ViewChildren` as shown in the [Stencil.js documentation](https://stenciljs.com/docs/angular).

## Usage with Vue.js

To integrate `@duetds/date-picker` into a [Vue.js application](https://vuejs.org/), edit `src/main.js` to include:

```js
// Import Duet Date Picker
import { defineCustomElements } from "@duetds/date-picker/lib/loader";

// ...
// configure Vue.js to ignore Duet Date Picker
Vue.config.ignoredElements = [/duet-\w*/];

// Register Duet Date Picker
defineCustomElements(window);

new Vue({
    render: h => h(App)
}).$mount("#app");
```

Once included, Duet Date Picker can be used in your HTML markup as in the following example:

```html
<label for="date">Choose a date</label>
<duet-date-picker identifier="date"></duet-date-picker>
```

## Usage with React

TODO

## Usage with Ember

Duet Date Picker can be easily integrated into Ember thanks to the `ember-cli-stencil` addon that handles:

- Importing the required files into your `vendor.js`
- Copying the component definitions into your `assets` directory
- Optionally generating a wrapper component for improved compatibility with older Ember versions

Start by installing the Ember addon:

```shell
ember install ember-cli-stencil
```

When you build your application, Stencil collections in your dependencies will be automatically discovered and pulled into your application. For more information, see [ember-cli-stencil documentation](https://github.com/alexlafroscia/ember-cli-stencil).

## Events

We encourage the use of DOM events, but additionally provide custom events to make handling of certain event types easier. All custom events are documented in this same readme if you scroll down a little.

Duet Date Picker provides e.g. a custom event called `duetChange`. This custom event includes an object called `detail` which includes for example the selected date:

```js
// Select the date picker component
var date = document.querySelector("duet-date-picker")

// Listen for when date is selected
date.addEventListener("duetChange", function(e) {
  console.log("selected date", e.detail.valueAsDate)
})
```

The console output for the above code looks like this:

```shell
selected date Sat Aug 15 2020 00:00:00 GMT+0300 (Eastern European Summer Time)
```

## Theming

TODO

## Server Side Rendering

Duet Date Picker package includes a hydrate app that is a bundle of the same components, but compiled so that they can be hydrated on a NodeJS server and generate static HTML and CSS. To get started, import the hydrate app into your server’s code like so:

```js
import hydrate from "@duetds/date-picker/hydrate"
```

If you are using for example [Eleventy](https://www.11ty.dev/), you could now add a transform into `.eleventy.js` configuration file that takes content as an input and processes it using Duet’s hydrate app:

```js
eleventyConfig.addTransform("hydrate", async(content, outputPath) => {
  if (process.env.ELEVENTY_ENV == "production") {
    if (outputPath.endsWith(".html")) {
      try {
        const results = await hydrate.renderToString(content, {
          clientHydrateAnnotations: true,
          removeScripts: false,
          removeUnusedStyles: false
        })
        return results.html
      } catch (error) {
        return error
      }
    }
  }
  return content
})
```

The above transform gives you server side rendered components that function without JavaScript. Please note that you need to separately pre-render the content for each theme you want to support.

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

## Changelog

- `1.0.0`: Initial release!

## License

Licensed under the [MIT license](https://github.com/duetds/date-picker/blob/master/LICENSE).