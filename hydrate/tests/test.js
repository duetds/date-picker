const fs = require("fs")
const path = require("path")
const { renderToString } = require("../index")

describe("hydrate.renderToString", () => {
  const getScreenshot = async page => {
    // get the element's height, and set viewport to that height
    // this enables us to get full page, clipped screenshots
    const htmlElement = await page.$("html")
    const { width, height } = await htmlElement.boundingBox()
    await page.setViewport({ width: page.viewport().width, height: Math.round(height) })

    return page.screenshot({
      clip: {
        x: 0,
        y: 0,
        width: Math.round(width),
        height: Math.round(height),
      },
    })
  }

  const setFixture = async fixtureName => {
    const filePath = path.join(__dirname, "fixtures", fixtureName)

    if (!fs.existsSync(filePath)) {
      throw new Error(`hydrate test fixture not found: ${fixtureName}`)
    }

    const fixture = fs.readFileSync(filePath, "utf-8")
    const result = await renderToString(fixture)
    await page.setContent(result.html, { waitUntil: "networkidle0" })
    await page.evaluateHandle(() => document.fonts.ready)
  }

  const injectDuetScript = async () => {
    await page.addScriptTag({
      url: "https://cdn.jsdelivr.net/npm/@duetds/date-picker@latest/dist/duet/duet.esm.js",
      type: "module",
    })
    // wait for all duet components etc to load
    await page.waitFor(2000)
  }

  beforeEach(async () => {
    await jestPuppeteer.resetBrowser()
  })

  test("kitchen sink", async () => {
    expect.assertions(2)
    const tolerance = {
      failureThreshold: 0.02,
      failureThresholdType: "percent",
    }

    await setFixture("kitchen-sink.html")

    // before hydration
    let screenshot = await getScreenshot(page)
    expect(screenshot).toMatchImageSnapshot(tolerance)

    await injectDuetScript()

    // after hydration
    screenshot = await getScreenshot(page)
    expect(screenshot).toMatchImageSnapshot(tolerance)
  })
})
