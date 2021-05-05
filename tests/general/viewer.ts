// eslint-disable-next-line import/no-extraneous-dependencies
import 'expect-puppeteer';
import { ViewerFunction } from '../../src/model/viewer';
import testing from '../../src/config/testing';
import { APIInterface, DispatchAPIAction } from '../../src/model/apiInterface';
import { Actions } from '../../src/model/actions';
import { ReadGardenEventHandler } from '../../src/model/events';

declare global {
  interface Window {
    readGardenViewer: ViewerFunction;
    api: APIInterface;
    setDispatcher: (newDispatcher: DispatchAPIAction) => void;
    eventHandler: ReadGardenEventHandler;
  }
}

describe('General', () => {
  it('should load without error', async () => {
    await page.goto(testing.baseURL);
    let state = await page.evaluate(() => {
      window.api = window.readGardenViewer({ layoutType: 'flow', eventHandler: window.eventHandler });
      window.setDispatcher(window.api.dispatch);
      return window.api.state;
    });
    state = await page.evaluate(() => {
      const action: Actions = {
        type: 'setScrollMode',
        scrollMode: 'vertical',
      };
      window.api.dispatch(action);
      return window.api.state;
    });
    expect(state.scrollMode).toBe('vertical');
  });
});
