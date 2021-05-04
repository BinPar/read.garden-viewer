// eslint-disable-next-line import/no-extraneous-dependencies
import * as puppeteer from 'puppeteer';

describe(
  'Google Page',
  () => {
    let page: puppeteer.Page;
    const globalAny = (global as unknown) as {__BROWSER__: puppeteer.Browser};
    // eslint-disable-next-line no-underscore-dangle
    const browser = globalAny.__BROWSER__;
    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
    });    
    it('should load without error', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('Viewer');
    });
  },
);
