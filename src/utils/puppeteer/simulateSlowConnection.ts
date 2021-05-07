/**
 * Simulates a slow connection in chrome browser
 * and disables network cache
 */
const simulateSlowConnection = async () => {
  // This config is only for chrome
  if (process.env.FIREFOX !== 'true') {
    // Set a slow connection
    const client = await page.target().createCDPSession();
    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: 1 * 1024 * 1024,
      uploadThroughput: 750 * 8096,
      latency: 0,
    });
    await page.setCacheEnabled(false);
  }
}

export default simulateSlowConnection;
