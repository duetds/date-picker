![CI Status](https://github.com/duetds/duet-date-picker-prep/workflows/CI/badge.svg) [![NPM Version](https://img.shields.io/npm/v/@duetds/date-picker.svg)](https://www.npmjs.com/package/@duetds/date-picker) ![Dependencies status](https://david-dm.org/duetds/date-picker.svg) ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)


# Duet Date Picker

Duet Date Picker is an open source version of [Duet Design System’s Date Picker](https://www.duetds.com/components/date-picker/). It’s a Web Component that lets user pick a date using a special calendar like date picker interface. Duet Date Picker can be implemented and used across any JavaScript framework or no framework at all. We accomplish this by using standardized web platform APIs and Web Components.

Duet Date Picker has a built-in functionality that allows you to set a minimum and a maximum allowed date. These settings can be combined or used alone, depending on the need. Please note that the date values must be passed in IS0-8601 format: `YYYY-MM-DD`.

**[Read getting started instructions ›](#getting-started)**
<br/>
**[Learn more about Duet ›](https://www.duetds.com)**

![Duet Date Picker](illustration.png)

## Sections in this documentation:

1. **[Introduction](#duet-date-picker)**
2. **[Live demo](#live-demo)**
3. **[Features](#features)**
4. **[Browser support](#browser-support)**
5. **[Screen reader support](#screen-reader-support)**
6. **[Getting started](#getting-started)**
7. **[Properties](#properties)**
8. **[Events](#events)**
9. **[Methods](#methods)**
10. **[Installation](#installation)**
11. **[Usage with basic HTML](#usage-with-basic-html)**
12. **[Usage with Angular](#usage-with-angular)**
13. **[Usage with Vue.js](#usage-with-vuejs)**
14. **[Usage with React](#usage-with-react)**
15. **[Usage with Ember](#usage-with-ember)**
16. **[IE11 and Edge 17/18 polyfills](#ie11-and-edge-1718-polyfills)**
17. **[Using events](#using-events)**
18. **[Theming](#theming)**
19. **[Server side rendering](#server-side-rendering)**
20. **[Single file bundle](#single-file-bundle)**
21. **[Optimizing CDN performance](#optimizing-cdn-performance)**
22. **[Contributing](#contributing)**
23. **[Changelog](#changelog)**
24. **[Roadmap](#roadmap)**
25. **[License](#license)**

## Live demo

- Default theme: [https://www.duetds.com/demos/date-picker/](https://www.duetds.com/demos/date-picker/)
- Dark theme: [https://www.duetds.com/demos/date-picker-dark/](https://www.duetds.com/demos/date-picker-dark/)

## Features

- Can be used with any JavaScript framework.
- Doesn’t require external dependencies.
- Weighs only ~10kb minified and Gzip’ed.
- Built accessibility in mind to supports WCAG 2.1.
- Supports all modern browsers and screen readers.
- Additionally limited support offered for IE11 and Edge 17+.
- Allows theming using CSS Custom Properties.
- Comes with modified interface for mobile devices to provide better user experience.
- Supports touch gestures for changing months and closing the picker.
- Built using [Stencil.js](https://stenciljs.com/) and Web Components.
- Free to use under the MIT license.

## Browser support

- Google Chrome 61+
- Apple Safari 11+
- Firefox 63+
- Microsoft Edge 17+
- Opera 63+
- Samsung Browser 8.2+
- Internet Explorer 11

## Screen Reader support

- VoiceOver on macOS and iOS
- TalkBack on Android
- NVDA on Windows
- Jaws on Windows

## Getting started

Integrating Duet Date Picker to a project without a JavaScript framework is very straight forward. If you’re working on a simple HTML page, you can start using Duet Date Picker immediately by adding these tags to the `<head>`:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.0.0-alpha.10/dist/duet/duet.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.0.0-alpha.10/dist/duet/duet.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.0.0-alpha.10/dist/duet/themes/default.css" />
```

Once included, Duet Date Picker can be used in your markup like any other regular HTML element:

```html
<label for="date">Choose a date</label>
<duet-date-picker identifier="date"></duet-date-picker>
```

**Please note: Importing the CSS file is optional and only needed if you’re planning on using the default theme. See [theming section](#theming) for more information. Additionally, while the above method is the easiest and fastest way to get started, you can also install Duet Date Picker via NPM. Scroll down for the [installation instructions](#installation).**

## Properties

| Property     | Attribute    | Description                                                                                                                                                               | Type                   | Default     |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `disabled`   | `disabled`   | Makes the date picker input component disabled. This prevents users from being able to interact with the input, and conveys its inactive state to assistive technologies. | `boolean`              | `false`     |
| `identifier` | `identifier` | Adds a unique identifier for the date picker input.                                                                                                                       | `string`               | `""`        |
| `language`   | `language`   | The currently active language. This setting changes the month/year/day names and button labels as well as all screen reader labels.                                       | `"en" \| "fi" \| "sv"` | `"en"`      |
| `max`        | `max`        | Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD This setting can be used alone or together with the min property.                               | `string`               | `""`        |
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

## Installation

Before moving further, please make sure you have [Node.js](https://nodejs.org/en/) installed on your machine. You can install the latest version through [their website](https://nodejs.org/en/). If you’re planning on using Duet Date Picker in a project that doesn’t yet use [Node Package Manager](https://www.npmjs.com), you’ll have to first create a [package.json](https://docs.npmjs.com/files/package.json) file. To do so, run <code>npm init</code> and follow the steps provided.

Once finished, you can install Duet Date Picker by running:

```shell
# WEB COMPONENT for HTML, Ember, Vue.js, React, Angular and Vanilla JS:
npm install @duetds/date-picker
```

## Usage with basic HTML

**Please note: We recommend the usage of CDN like JSDelivr over the below approach if you’re not [server side rendering](#server-side-rendering) Duet Date Picker. See [getting started section](#getting-started) to find the correct script tags.**

Once you’ve installed `@duetds/date-picker` package into your project, it’s recommended to create a copy task that copies Duet Date Picker component from `node_modules` to a location you’ve specified. One such tool that can do this is [NCP](https://www.npmjs.com/package/ncp). You can install `ncp` by running:

```shell
npm install ncp --save-dev
```

Once installed, add a script to your package.json that copies the component library from Duet’s package into a location you’ve specified:

```json
"scripts": {
  "copy:duet-date-picker": "ncp node_modules/@duetds/date-picker/dist src/SPECIFY_PATH"
}
```

You can call this script while starting up your app to make sure you’ve always got the latest code copied over. If you’re using an UNIX-like environment, you can use `&` as the separator:

```json
"start": "copy:duet-date-picker & dev"
```

Otherwise, if you need a cross-platform solution, use [npm-run-all module](https://www.npmjs.com/package/npm-run-all):

```json
"start": "npm-run-all copy:duet-date-picker dev"
```

Once you have a copy task in place and have copied Duet Date Picker over, you can put tags similar to these in the `<head>` of your `index.html` (importing the CSS file is optional and only needed if you’re planning on using the default theme. See [theming section](#theming) for more information):

```html
<script type="module" src="SPECIFY_YOUR_PATH/duet.esm.js"></script>
<script nomodule src="SPECIFY_YOUR_PATH/duet.js"></script>
<link rel="stylesheet" href="SPECIFY_YOUR_PATH/duet.css" />
```

Once included, Duet Date Picker can be used in your basic HTML markup as in the following example:

```html
<label for="date">Choose a date</label>
<duet-date-picker identifier="date"></duet-date-picker>
```

## Usage with Angular

Before you can use Duet Date Picker in Angular, you must import and add Angular’s `CUSTOM_ELEMENTS_SCHEMA`. This allows the use of Web Components in HTML markup, without the compiler producing errors. The `CUSTOM_ELEMENTS_SCHEMA` needs to be included in any module that uses custom elements. Typically, this can be added to `AppModule`:

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
import { defineCustomElements } from "@duetds/date-picker/dist/loader";
// ...
// Register Duet Date Picker
defineCustomElements(window);
```

Once included, Duet Date Picker can be used in your HTML markup as in the following example:

```html
<label for="date">Choose a date</label>
<duet-date-picker identifier="date"></duet-date-picker>
```

Please note that you need to also import `duet.css` separately if you want to use the default theme. See [theming section](#theming) for more information.

### Accessing using ViewChild and ViewChildren

Once included, components could also be referenced in your code using `ViewChild` and `ViewChildren` as shown in the [Stencil.js documentation](https://stenciljs.com/docs/angular).

## Usage with Vue.js

To integrate `@duetds/date-picker` into a [Vue.js application](https://vuejs.org/), edit `src/main.js` to include:

```js
// Import Duet Date Picker
import { defineCustomElements } from "@duetds/date-picker/dist/loader";

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

Please note that you need to also import `duet.css` separately if you want to use the default theme. See [theming section](#theming) for more information.

## Usage with React

With an application built using the `create-react-app` script the easiest way to include Duet Date Picker is to call `defineCustomElements(window)` from the `index.js` file:

```js
// Import Duet Date Picker
import { defineCustomElements } from "@duetds/date-picker/dist/loader";

// ...
// Register Duet Date Picker
defineCustomElements(window);
```

Once included, components can be used in `render()` function like this:

```js
import React, { Component } from "react";
import duetRef from "@duetds/date-picker/dist/collection/utils/react";

export class ReactExample extends Component {
    value = "Default Value";

    onDateChanged(event) {
      // value changed callback (event.detail = value)
    }

    render() {
        return (
            <duet-date-picker ref={
                duetRef({
                    value: this.value
                }, {
                    duetChange: event => this.onDateChanged(event)
                })
            }>
            </duet-date-picker>
        );
    }
}
```

In the above example `duetHref` binds properties and events to our custom element and returns the event. It can be used in React.js’ `ref` attribute like this:

```js
<duet-date-picker ref={
  duetRef({
    prop1: "a"
  }, {
    event: () => this.handleEvent()
  })
}>
</duet-date-picker>
```

The above example is a **one time binding** for properties and will not update automatically. If you need updates on properties you’ll have to save element references and update them manually:

```js
<duet-date-picker ref={
  el => { this.element = duetRef({
    prop1: "a" }, {
    event: () => this.handleEvent()
  })(el)
}>
</duet-date-picker>
```

Using the above reference you can update prop1 using:

```js
this.element.prop1 = "b"
```

Following the steps above will enable your web components to be used in React, however there are some additional complexities that must also be considered. [Custom Elements Everywhere](https://custom-elements-everywhere.com/) describes them well.

Please note that you need to also import `duet.css` separately if you want to use the default theme. See [theming section](#theming) for more information.

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

## IE11 and Edge 17/18 polyfills

If you want the Duet Date Picker custom element to work on older browser, you need to add the `applyPolyfills()` that surround the `defineCustomElements()` function:

```js
import { applyPolyfills, defineCustomElements } from "@duetds/date-picker/lib/loader";
// ...
applyPolyfills().then(() => {
  defineCustomElements(window)
})
```

## Using events

We encourage the use of DOM events, but additionally provide custom events to make handling of certain event types easier. All custom events are documented in this same readme [under the “Events” heading](#events).

Duet Date Picker provides e.g. a custom event called `duetChange`. This custom event includes an object called `detail` which includes for example the selected date:

```js
// Select the date picker component
const date = document.querySelector("duet-date-picker")

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

Duet Date Picker uses CSS Custom Properties to make it easy to theme the picker. The component ships with a default theme that you can import either from the NPM package or directly from a CDN like JSDelivr:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.0.0-alpha.10/dist/duet/themes/default.css" />
```

The above CSS file provides the following Custom Properties that you can override with your own properties:

```css
:root {
  --duet-color-primary: #005fcc;
  --duet-color-text: #333;
  --duet-color-text-active: #fff;
  --duet-color-button: #f5f5f5;
  --duet-color-surface: #fff;
  --duet-color-overlay: rgba(0, 0, 0, 0.8);

  --duet-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --duet-font-normal: 400;
  --duet-font-bold: 600;

  --duet-radius: 4px;
  --duet-z-index: 600;
}
```

If you wish to customize any of the default properties shown above, *we recommend to NOT import or link to the provided CSS,* but instead copying the above code into your own stylesheet and replacing the values used there.

Additionally, you’re able to override Duet Date Picker’s default styles by using e.g. `.duet-date__input` selector in your own stylesheet. This allows you to give the form input and e.g. date picker toggle button a visual look that matches the rest of your website.

## Server side rendering

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

## Single file bundle

Duet Date Picker also offers a single file bundle without any of the polyfills and other additional functionality included in the default output. To import that instead of the default output, use:

```jsx
import { DuetDatePicker } from "@duetds/date-picker/custom-element";

customElements.define("duet-date-picker", DuetDatePicker);
```

Please note that this custom-element output does not automatically define the custom elements or apply any polyfills which is why we’re defining the custom element above ourselves.

Additionally, you will need to add `@stencil/core` as a dependency for your application when importing the single file bundle:

```json
{
  "dependencies": {
    "@stencil/core": "latest"
  }
}
```

For more details, please see [Stencil.js documentation](https://stenciljs.com/docs/custom-elements).

## Optimizing CDN performance

If you wish to make sure Duet Date Picker shows up as quickly as possible when loading the scripts from JSDelivr CDN, you can preload the key parts using link `rel="preload"`. To do this, add these tags in the `<head>` of your webpage before any other `<script>` or `<link>` tags:

```html
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.0.0-alpha.10/dist/duet/duet.esm.js" as="script" crossorigin="anonymous" />
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.0.0-alpha.10/dist/duet/duet-date-picker.entry.js" as="script" crossorigin="anonymous" />
```

In case you’re also using one of the included themes, you can preload them the same way using the below tag:

```html
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.0.0-alpha.10/dist/duet/themes/default.css" as="style" />
```

## Contributing

### Development server

- Clone the repository by running `git clone git@github.com:duetds/duet-date-picker.git`.
- Once cloned, open the directory and run `npm install`.
- Run `npm start` to get the development server and watch tasks up and running. This will also automatically open a new browser window with a few demo date pickers.

### Testing and building

- To run the unit, end-to-end and visual diff tests use `npm run test`.
- To build the project use `npm run build`.

### Publishing the package

1. Bump version in `package.json` and elsewhere.
2. Push your changes to Git and then run `npm publish`.
3. Tag new release by running `git tag -a 1.0.0 -m "1.0.0"`.
4. Push to git: `git push --tags`

## Changelog

- `1.0.0`: Initial release.

## Roadmap

- Providing support for extending the languages from outside in addition to the provided English, Finnish and Swedish.
- Providing support for US and other date formats.
- Making it possible to pass in your own input component.

## License

Copyright © 2020 LocalTapiola Services Ltd / [Duet Design System](https://www.duetds.com). 

Licensed under the [MIT license](https://github.com/duetds/date-picker/blob/master/LICENSE).