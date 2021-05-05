// eslint-disable-next-line import/no-extraneous-dependencies
import 'expect-puppeteer';
import { ViewerFunction } from '../../src/model/viewer';
import testing from '../../src/config/testing';
import { APIInterface, DispatchAPIAction } from '../../src/model/apiInterface';
import { Actions } from '../../src/model/actions';
import { ReadGardenEventHandler } from '../../src/model/events';
import { State } from '../../src/model/state';

declare global {
  interface Window {
    readGardenViewer: ViewerFunction;
    readGardenApi: APIInterface;
    readGardenSetDispatcher: (newDispatcher: DispatchAPIAction) => void;
    readGardenEventHandler: ReadGardenEventHandler;
    readGardenSetState: (newState: State) => void;
  }
}

describe('General', () => {
  it('should load without error', async () => {
    await page.goto(testing.baseURL);
    let state = await page.evaluate(() => {
      window.readGardenApi = window.readGardenViewer({
        layoutType: 'flow',
        eventHandler: window.readGardenEventHandler,
        contentSlug: 'acuario',
        startPageLabel: '64',
      });
      window.readGardenSetDispatcher(window.readGardenApi.dispatch);
      window.readGardenSetState(window.readGardenApi.state);
      return window.readGardenApi.state;
    });
    state = await page.evaluate(() => {
      const action: Actions = {
        type: 'setScrollMode',
        scrollMode: 'vertical',
      };
      window.readGardenApi.dispatch(action);
      return window.readGardenApi.state;
    });
    expect(state.scrollMode).toBe('vertical');
  });
});
