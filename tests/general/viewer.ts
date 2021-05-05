// eslint-disable-next-line import/no-extraneous-dependencies
import 'expect-puppeteer';
import { ViewerFunction } from '../../src/model/viewerFunction';

declare global {
  interface Window {
    readGardenViewer: ViewerFunction;
  }
}

describe('General', () => {
  it('should load without error', async () => {
    await page.goto('http://localhost:3000/');
    const title = await page.evaluate(() => document.title);
    expect(title).toContain('Viewer');    
    const state = await page.evaluate(() => {
      const api = window.readGardenViewer({ layoutType: 'flow' });      
      return api.state;
    });
    expect(state).toBeDefined();
  });
});
