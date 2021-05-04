module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
    product: process.env.FIREFOX === 'true' ? 'firefox' : 'chrome',
    // true to display the browser console output in the terminal
    // very useful for debugging, but not compatible with FireFox
    dumpio: process.env.FIREFOX !== 'true',
  },
};
