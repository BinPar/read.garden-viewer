// eslint-disable-next-line import/no-extraneous-dependencies
import 'expect-puppeteer';

describe(
  'General',
  () => {    
    it('should load without error', async () => {
      await page.goto('http://localhost:3000/');      
      const title = await page.evaluate(() => document.title)      
      expect(title).toContain('Viewer');     
    });
  },
);
