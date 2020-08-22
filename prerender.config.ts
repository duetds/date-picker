import { PrerenderConfig } from "@stencil/core"

export const config: PrerenderConfig = {
  hydrateOptions(url) {
    return {
      prettyHtml: false,
      clientHydrateAnnotations: true,
      removeScripts: false,
      removeUnusedStyles: false,
    }
  },
}
