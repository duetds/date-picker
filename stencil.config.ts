import { Config } from "@stencil/core"
import { sass } from "@stencil/sass"
import { reactOutputTarget } from "@stencil/react-output-target"
import { angularOutputTarget, ValueAccessorConfig } from "@duetds/stencil-angular-output-target"
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
  namespace: "duet",
  enableCache: true,
  hashFileNames: true,
  autoprefixCss: false,
  minifyCss: true,
  buildEs5: true,
  taskQueue: "async",
  globalStyle: "src/themes/default.css",
  preamble: "Built with Duet Design System",
  hashedFileNameLength: 8,
  commonjs: { include: /node_modules|(..\/.+)/ } as any,
  bundles: [{ components: ["duet-date-picker"] }],
  devServer: {
    openBrowser: true,
    port: 3333,
    reloadStrategy: "pageReload",
  },
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    initializeNextTick: true,
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: false,
  },
  outputTargets: [
    {
      type: "dist-hydrate-script",
      dir: "hydrate",
      empty: false,
    },
    {
      type: "dist-custom-elements-bundle",
      dir: "custom-element",
      empty: true,
    },
    {
      type: "dist",
      dir: "dist",
      empty: true,
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      dir: "www",
      serviceWorker: null,
      empty: true,
      copy: [
        {
          src: "themes",
          dest: "themes",
        },
      ],
    },
  ],
  plugins: [
    sass(),
  ],
  testing: {
    browserHeadless: process.env.TEST_HEADLESS !== "false",
    setupFilesAfterEnv: ["<rootDir>/jest/jest-setup.js"],
    testPathIgnorePatterns: ["<rootDir>/hydrate/", "<rootDir>/lib/"],
  },
}
