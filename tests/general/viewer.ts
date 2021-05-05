// eslint-disable-next-line import/no-extraneous-dependencies
import 'expect-puppeteer';

describe('General', () => {
  it('should load without error', async () => {
    await page.goto('http://localhost:3000/');
    const title = await page.evaluate(() => document.title);
    const h1Rect = await page.evaluate(() => {
      const rects = document.querySelector('h1')?.getClientRects();
      if (rects) {
        const [rect] = Array.from(rects);
        if (rect) {
          return {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          };
        }
      }
      return null;
    });    
    expect(h1Rect).not.toBeNull();     
    expect(h1Rect?.width).toBeGreaterThan(100);
    expect(title).toContain('Viewer');    
  });
});
