// eslint-disable-next-line import/no-extraneous-dependencies
import 'expect-puppeteer';
import testing from '../../../src/config/testing';
import simulateSlowConnection from '../../../src/utils/puppeteer/simulateSlowConnection';
import setupViewerConfig from '../../../src/utils/puppeteer/setupViewerConfig';
import getEndOfChapterPositionString from '../../../src/utils/puppeteer/getEndOfChapterPositionString';

describe('Initial Load Draw', () => {
  it('should load flow layout chapter without flashes and redraws', async () => {
    await simulateSlowConnection();
    // Navigate to the viewer
    await page.goto(testing.baseURL);
    // Setup the flow layout
    const state = await page.evaluate(
      setupViewerConfig,
      JSON.stringify(testing.longFlowLayoutContentConfig),
    );
    // We check that the css is not loaded
    expect(state.cssLoaded).toBeFalsy();
    // Wait for the page to tell that the CSS is loaded
    await page.waitForFunction(() => window.readGardenApi.state.cssLoaded);
    // Get the position of the end of the chapter marker
    const initialEndOfChapterPosition = await page.evaluate(
      getEndOfChapterPositionString,
    );
    // Wait 500 milliseconds
    await page.waitForTimeout(500);
    // Get the position of the end of the chapter marker again
    const delayedEndOfChapterPosition = await page.evaluate(
      getEndOfChapterPositionString,
    );
    // Check that the end of chapter is in the exact same position
    expect(delayedEndOfChapterPosition).toBe(initialEndOfChapterPosition);
  });
});
