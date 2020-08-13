![Dependencies status](https://david-dm.org/duetds/date-picker.svg) ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)


# Duet Date Picker

### Duet Date Picker is an open source version of Duet Design System’s Date Picker. It’s a Web Component that lets user pick a date using a special calendar like date picker interface. 

Duet Date Picker can be implemented and used across any JavaScript framework or no framework at all. We accomplish this by using standardized web platform APIs and Web Components.

**[Read more about Duet](https://www.duetds.com)**

## Getting started

Integrating Duet Date Picker to a project without a JavaScript framework is very straight forward. If you’re working on a simple HTML page, you can start using the components immediately by adding this script tag to the `<head>`:

  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.0.0/lib/duet/duet.esm.js" integrity="sha384-CskLiBIZer21tX1u8y09KWw7vB69hCNs4d8/REEwv2WavdLmqwZcCKmC8VOzmzft" crossorigin="anonymous"></script>
  ```
  
  Once included, the component can be used in your markup like any other regular HTML elements:
  
  ```html
  <label for="date">Choose a date</label>
  <duet-date-picker identifier="date"></duet-date-picker>
  ```

## Installation

Before moving further, please make sure you have [Node.js](https://nodejs.org/en/) installed on your machine. You can install the latest version through [their website](https://nodejs.org/en/). If you’re planning on using Duet Components in a project that doesn’t yet use [Node Package Manager](https://www.npmjs.com), you’ll have to first create a [package.json](https://docs.npmjs.com/files/package.json) file. To do so, run <code>npm init</code> and follow the steps provided.

Once finished, you can install Duet Date Picker by running:

```shell
# WEB COMPONENTS for HTML, Ember, Vue.js, React, Angular and Vanilla JS:
npm install @duetds/date-picker
```

## Usage with basic HTML

Once you’ve installed `@duetds/components` package into your project, it’s recommended to create a copy task that copies the [component library](/components/) from `node_modules` to a location you’ve specified. One such tool that can do this is [NCP](https://www.npmjs.com/package/ncp). You can install `ncp` by running:

```shell
npm install ncp --save-dev
```

Once installed, add a script to your package.json that copies the component library from [Duet’s package](https://www.npmjs.com/org/duetds) into a location you’ve specified:

```json
"scripts": {
  "copy:components": "ncp node_modules/@duetds/components/lib src/SPECIFY_PATH"
}
```

You can call this script while starting up your app to make sure you’ve always got the latest component library copied over. If you’re using an UNIX-like environment, you can use `&` as the separator:

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
<script nomodule src="SPECIFY_YOUR_PATH/duet.js"></script>
```

Once included, components can be used in your basic HTML markup as in the following example:

```html
<duet-button variation="primary">Send</duet-button>
```

<div>
  <duet-alert variation="warning"><strong>Please note:</strong> we now favor the usage of <a href="/cdn/">Duet CDN</a> over this approach. Scroll to the top of the page to find the correct script and link tags.</duet-alert>
  </div>
<div>
<duet-alert>For more concrete usage examples see the <a href="/templates/">templates section</a> and individual <a href="/components/button/">component examples</a> in the documentation.</duet-alert>
</div>

## Usage with Angular

It’s recommended to use the `@duetds/angular` package, but you can also use our Web Components directly. To get started, first install our Web Components package:

```shell
npm install @duetds/components
```

Before you can use the Web Components in Angular, you must import and add Angular’s `CUSTOM_ELEMENTS_SCHEMA`. This allows the use of Web Components in HTML markup, without the compiler producing errors. The `CUSTOM_ELEMENTS_SCHEMA` needs to be included in any module that uses custom elements. Typically, this can be added to `AppModule`:

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

The final step is to load and register Duet’s components in the browser. `@duetds/components` includes a main function that handles this. That function is called `defineCustomElements()` and it needs to be called once during the bootstrapping of your application. One convenient place to do this is in `main.ts` as such:

```js
// Import Duet Web Components
import { defineCustomElements } from "@duetds/components/lib/loader";
// ...
// Register Duet Web Components
defineCustomElements(window);
```

Once included, components can be used in your HTML markup as in the following example:

```html
<duet-button variation="primary">Send</duet-button>
```

For more concrete usage examples see the [templates section](/templates/) and individual [component examples](/components/button/) in the documentation.

### Edge and IE11 polyfills

If you want your custom elements to be able to work on older browser, you should add the `applyPolyfills()` that surround the `defineCustomElements()` function.

```js
import { applyPolyfills, defineCustomElements } from "@duetds/components/lib/loader";
// ...
applyPolyfills().then(() => {
  defineCustomElements(window)
})
```

### Accessing using ViewChild and ViewChildren

Once included, components could also be referenced in your code using `ViewChild` and `ViewChildren` as shown in the [Stencil.js documentation](https://stenciljs.com/docs/angular).

## Usage with Vue.js

To integrate `@duetds/components` into a [Vue.js application](https://vuejs.org/), edit `src/main.js` to include:

```js
// Import Duet Web Components
import { applyPolyfills, defineCustomElements } from "@duetds/components/lib/loader";
// ...
// configure Vue.js to ignore Duet Web Components
Vue.config.ignoredElements = [/duet-\w*/];
// Register Duet Web Components
applyPolyfills().then(() => {
    defineCustomElements(window);
});

new Vue({
    render: h => h(App)
}).$mount("#app");
```

Note that in the above scenario `applyPolyfills` is only needed if you are targeting Edge or IE11. Once included, components can be used in your HTML markup as in the following example:

```html
<duet-button variation="primary">Send</duet-button>
```

For more concrete usage examples see the [templates section](/templates/) and individual [component examples](/components/button/) in the documentation.`

## Usage with React

TODO

## Usage with Ember

Duet components can be easily integrated into Ember thanks to the `ember-cli-stencil` addon that handles:

- Importing the required files into your `vendor.js`
- Copying the component definitions into your `assets` directory
- Optionally generating a wrapper component for improved compatibility with older Ember versions

Start by installing the Ember addon:

```shell
ember install ember-cli-stencil
```

When you build your application, Stencil collections in your dependencies will be automatically discovered and pulled into your application. For more information, see [ember-cli-stencil documentation](https://github.com/alexlafroscia/ember-cli-stencil).

## Events

We encourage the use of DOM events, but additionally provide custom events to make handling of certain event types easier. All custom events are always documented in component’s own documentation page.

All form and interactive components in Duet provide a custom event called `duetChange`. This custom event includes an object called `detail` which always provides the following meta data:

```js
{
  value: "new value of the component that changed",
  component: "tag name of the component that triggered change"
}
```

Additionally, depending on the component type, this same `detail`object can also include:

```js
{
  checked: "checked state of the component",
  originalEvent: "original event so you can use e.g. preventDefault"
}
```

An example of the above is [Input component](/components/input/) that provides `duetChange` for detecting value changes inside the input field:

```html
<duet-input label="My label" debounce="500"></duet-input>

<script>
  // Select the above input component
  var input = document.querySelector("duet-input")

  // Listen for changes. Use debounce to adjust time to trigger.
  input.addEventListener("duetChange", function(e) {
    console.log("Change detected in input:", e.detail)
  })
</script>
```

The console output for the above code looks like this:

```json
Change detected in input: {
  value: "string that user wrote in the input",
  component: "duet-input"
}
```

In addition to form components, a few other component types also provide `duetChange` event that you can listen to. One example is [Header](/components/header/) that allows you to listen for navigation clicks inside the component through `duetChange`:

```html
<duet-header></duet-header>

<script>
  // Select the above header component
  var header = document.querySelector("duet-header")

  // Listen for change events inside the header.
  // This gets triggered whenever a link or button in header is clicked.
  header.addEventListener("duetChange", function(e) {
    var event = e.detail.originalEvent
    event.preventDefault()
    console.log("Change detected in header:", e.detail)
  })
</script>
```

The console output for the above code looks like this:

```json
Change detected in nav: {
  originalEvent: {},
  component: "duet-header",
  data: {
    label: "Label of the item clicked",
    href: "Href of the item clicked",
    badge: "Whether the item has badge or not",
    id: "Id attribute of item clicked"
  }
}
```

### Events in Angular

For Angular, you must wire up values and event handlers for inputs yourself:

**example-component.html:**

```html
<duet-input
  #input
  [value]="textValue"
  (duetChange)="handleChange($event)">
</duet-input>
<duet-button (click)="handleClick()">Click me</duet-button>
```

**example-component.ts:**

```js
@Component({
  selector: "example-component",
  templateUrl: "./example-component.html",
})
export class ExampleComponent {
  @ViewChild("input") input: HTMLDuetInputElement;
  textValue = "Duet";

  handleChange(event) {
    this.textValue = event.target.value
  }

  handleClick() {
    console.log(this.textValue)
  }
}
```

### Events in Vue

```html
<template>
  <duet-input
    @click="onClick($event)"
    @duetFocus="onFocus($event)"
    @duetChange="onChange($event)"
    :value.prop="textValue">
  </duet-input>
</template>

<script>
  export default {
    name: "InputExample",
    data: () => ({
      textValue: "Duet",
    }),
    methods: {
      onClick(event) {
        // click event
      },
      onFocus(event) {
        // focus event
      },
      onChange(event) {
        // value change event
      },
    }
  }
</script>
```

### Events in React

TODO

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