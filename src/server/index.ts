/* eslint-disable no-console */
import log from 'loglevel';
// eslint-disable-next-line import/no-extraneous-dependencies
import browserSync from 'browser-sync';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as ngrok from 'ngrok';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
browserSync(
  {
    server: 'web',
    files: ['web/*.*', 'web/*/*.*'],
    cors: true,
    port,
    startPath: '/hepatologia.html',
    codeSync: true,
  },
  () => {
    console.info(`Running at http://localhost:${port}`);
  },
);

const runNgrok = async (): Promise<void> => {
  const url = await ngrok.connect(port);
  log.warn(`Listening on: ${url}`);
};

runNgrok().catch((ex) => {
  const { stack, message } = ex as Error;
  console.error('Error running ngrok', stack || message);
});
