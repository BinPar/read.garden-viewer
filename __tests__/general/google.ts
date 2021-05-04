import * as puppeteer from 'puppeteer';

const timeout = 5000;

describe(
  'Google Page',
  () => {
    let page: puppeteer.Page;
    const globalAny = (global as unknown) as {__BROWSER__: puppeteer.Browser};
    // eslint-disable-next-line no-underscore-dangle
    const browser = globalAny.__BROWSER__;
    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('https://google.com');
    }, timeout);
    it('should load without error', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('google');
    });
  },
);
