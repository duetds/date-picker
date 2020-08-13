/**
 * This function binds properties and events to a custom element and returns the event.
 * It can be used in the react "ref" attribute like this:
 * ```<custom-element ref={ duetRef({ prop1: 'a' }, { event: () => this.handleEvent() }) }></custom-element>```
 * The above example is a *one time binding* for properties and will not update automatically.
 * If you need updates on properties you'll have to save element references and update them manually:
 * ```<custom-element ref={ el => { this.element = duetRef({ prop1: 'a' }, { event: () => this.handleEvent() })(el); }></custom-element>```
 * using this reference you can update prop1: ```this.element.prop1 = 'b';```.
 *
 * @param {*} properties The properties to bind to a custom element.
 * @param {*} events The event listeners to bind to a custom element.
 */
export default function duetRef(properties, events) {
  return el => {
    if (el) {
      for (const key of Object.keys(properties)) {
        el[key] = properties[key]
      }
      for (const event of Object.keys(events)) {
        el.addEventListener(event, events[event])
      }
    }
    return el
  }
}
