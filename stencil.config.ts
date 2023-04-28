import { Config } from "@stencil/core"
import { sass } from "@stencil/sass"

export const config: Config = {
  // See https://github.com/ionic-team/stencil/blob/master/src/declarations/config.ts for config
  namespace: "duet",
  sourceMap: false,
  devServer: {
    openBrowser: true,
    port: 3333,
    reloadStrategy: "pageReload",
  },
  outputTargets: [
    {
      type: "dist-hydrate-script",
      dir: "hydrate",
      empty: false,
    },
    {
      type: "dist-custom-elements",
      dir: "custom-element",
      empty: true,
    },
    {
      type: "dist",
      dir: "dist",
      esmLoaderPath: "./loader",
      empty: true,
      copy: [{ src: "themes", warn: true }],
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      dir: "www",
      serviceWorker: null,
      empty: true,
      baseUrl: "https://duetds.github.io/",
      prerenderConfig: "./prerender.config.ts",
      copy: [{ src: "themes", dest: "themes", warn: true }],
    },
  ],
  plugins: [sass()],
  testing: {
    browserHeadless: process.env.TEST_HEADLESS !== "false",
    setupFilesAfterEnv: ["<rootDir>/jest/jest-setup.js"],
    testPathIgnorePatterns: ["<rootDir>/hydrate/", "<rootDir>/dist/"],
  },
}
