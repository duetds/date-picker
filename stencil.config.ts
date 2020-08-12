import { Config } from "@stencil/core"
import { sass } from "@stencil/sass"
import { reactOutputTarget } from "@stencil/react-output-target"
import { angularOutputTarget, ValueAccessorConfig } from "@duetds/stencil-angular-output-target"
import replace from "@rollup/plugin-replace"
import pkg from "./package.json"

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ["duet-date-picker"],
    event: "duetChange",
    targetAttr: "value",
    type: "text",
  },
]

export const config: Config = {
  // See https://github.com/ionic-team/stencil/blob/master/src/declarations/config.ts for config
  namespace: "Duet",
  enableCache: true,
  hashFileNames: true,
  autoprefixCss: false,
  minifyCss: true,
  taskQueue: "async",
  preamble: "Built with Duet Design System",
  hashedFileNameLength: 8,
  commonjs: { include: /node_modules|(..\/.+)/ } as any,
  bundles: [{ components: ["duet-date-picker"] }],
  devServer: {
    openBrowser: false,
    port: 3333,
    reloadStrategy: "hmr",
  },
  extras: {
    cssVarsShim: false,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: true,
    // Enabling the below option causes hierarchyRequestError in Edge 16 & 17.
    appendChildSlotFix: false,
    cloneNodeFix: false,
    // The below is required for pre-Blink Edge to make e.g. Tabs work in SSR mode.
    slotChildNodesFix: true,
  },
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "@duetds/components",
      proxiesFile: "../react/src/components.ts",
      loaderDir: "lib/loader",
      includeDefineCustomElements: true,
      includePolyfills: true,
    }),
    angularOutputTarget({
      componentCorePackage: "@duetds/components",
      directivesProxyFile: "../angular/src/directives/proxies.ts",
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    {
      type: "dist-hydrate-script",
      dir: "hydrate",
      empty: false,
    },
    {
      type: "dist-custom-elements-bundle",
      dir: "lib/custom-elements-bundle",
      empty: true,
    },
    {
      type: "dist",
      dir: "lib",
      empty: true,
    },
    {
      type: "www",
      dir: "www",
      serviceWorker: null,
      empty: true,
      copy: [
        {
          src: "theme.css",
          dest: "theme.css",
        },
      ],
    },
  ],
  plugins: [sass()],
  testing: {
    browserHeadless: process.env.TEST_HEADLESS !== "false",
    setupFilesAfterEnv: ["<rootDir>/jest/jest-setup.js"],
    testPathIgnorePatterns: ["<rootDir>/hydrate/", "<rootDir>/lib/"],
  },
}
