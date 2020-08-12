const { configureToMatchImageSnapshot } = require("jest-image-snapshot")

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 300,
  customDiffConfig: {
    threshold: 0.2,
  },
})

expect.extend({ toMatchImageSnapshot })
