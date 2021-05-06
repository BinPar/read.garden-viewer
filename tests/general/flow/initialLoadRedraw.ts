// eslint-disable-next-line import/no-extraneous-dependencies
import 'expect-puppeteer';
import testing from '../../../src/config/testing';

describe('Initial Load Redraw', () => {
  it('should load flow layout chapter without flashes and redraws', async () => {
    // This config is only for chrome
    if (process.env.FIREFOX !== 'true') {
      // Set a slow connection    
      const client = await page.target().createCDPSession();
      await client.send('Network.enable');
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: (1 * 1024 * 1024),
        uploadThroughput: (750 * 8096),
        latency: 0,
      });
      await page.setCacheEnabled(false);
    }
    // Navigate to the viewer
    await page.goto(testing.baseURL);
    // Setup the flow layout
    const state = await page.evaluate((longFlowLayoutContentConfig) => {
      const config = JSON.parse(longFlowLayoutContentConfig);
      config.eventHandler = window.readGardenEventHandler;
      window.readGardenApi = window.readGardenViewer(config);
      window.readGardenSetDispatcher(window.readGardenApi.dispatch);
      window.readGardenSetState(window.readGardenApi.state);
      return window.readGardenApi.state;
    }, JSON.stringify(testing.longFlowLayoutContentConfig));
    // We check that the css is not loaded
    expect(state.cssLoaded).toBeFalsy();
    // Wait for the page to tell that the CSS is loaded
    await page.waitForFunction(() => window.readGardenApi.state.cssLoaded);
    // Get the position of the end of the chapter marker
    const initialEndOfChapterPosition = await page.evaluate(() => {
      const rect = document
        ?.querySelector('.rg-end-of-chapter-calculator')
        ?.getBoundingClientRect();
      return `${rect?.x}-${rect?.y}`;
    });
    // Wait one entire second
    await page.waitForTimeout(1000);
    // Get the position of the end of the chapter marker again
    const delayedEndOfChapterPosition = await page.evaluate(() => {
      const rect = document
        ?.querySelector('.rg-end-of-chapter-calculator')
        ?.getBoundingClientRect();
      return `${rect?.x}-${rect?.y}`;
    });
    // Check that the end of chapter is in the exact same position
    expect(delayedEndOfChapterPosition).toBe(initialEndOfChapterPosition);
  });
});
