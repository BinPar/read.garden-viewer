// eslint-disable-next-line import/no-extraneous-dependencies
import 'expect-puppeteer';
import { APIInterface } from '../../src/model/apiInterface';
import { InitialConfig } from '../../src/model/config';

describe('General', () => {
  it('should load without error', async () => {
    await page.goto('http://localhost:3000/');
    const title = await page.evaluate(() => document.title);
    expect(title).toContain('Viewer');
    const state = await page.evaluate(() => {
      type ViewerContainer = {
        readGardenViewer: (config: InitialConfig) => APIInterface;
      };
      const viewerFunction = ((window as unknown) as ViewerContainer)
        .readGardenViewer;
      const api = viewerFunction({ layoutType: 'flow' });
      return api.state;
    });
    expect(state).toBeDefined();
  });
});
