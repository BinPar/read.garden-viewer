import 'expect-puppeteer';

describe(
  'General',
  () => {    
    it('should load without error', async () => {
      await page.goto('http://localhost:3000/');
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('Viewer');
    });
  },
);
