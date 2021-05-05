// eslint-disable-next-line import/no-extraneous-dependencies
import 'expect-puppeteer';
import { ViewerFunction } from '../../src/model/viewerFunction';
import testing from '../../src/config/testing';
import { APIInterface } from '../../src/model/apiInterface';

declare global {
  interface Window {
    readGardenViewer: ViewerFunction;
    api: APIInterface;
  }
}

describe('General', () => {
  it('should load without error', async () => {
    await page.goto(testing.baseURL);
    let state = await page.evaluate(() => {
      window.api = window.readGardenViewer({ layoutType: 'flow' });
      return window.api.state;
    });
    state = await page.evaluate(() => {
      const action = {
        type: 'setScrollMode',
        scrollMode: 'vertical',
      };
      window.api.dispatch(action);
      return window.api.state;
    });
    expect(state.scrollMode).toBe('vertical');
  });
});
