module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
    product: process.env.FIREFOX === 'true' ? 'firefox' : 'chrome',
    dumpio: true,
  },
}