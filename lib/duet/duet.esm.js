import { b as bootstrapLazy } from './p-cc1e0b8e.js';
import { p as patchBrowser, g as globalScripts } from './p-e4770998.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["p-0060d432",[[1,"duet-date-picker",{"name":[1],"identifier":[1],"label":[1],"language":[1],"disabled":[516],"error":[1],"labelHidden":[4,"label-hidden"],"role":[1],"value":[513],"min":[1],"max":[1],"activeFocus":[32],"open":[32],"focusedDay":[32],"setFocus":[64],"show":[64],"hide":[64]},[[6,"click","handleDocumentClick"]]]]]], options);
});
