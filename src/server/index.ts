// eslint-disable-next-line import/no-extraneous-dependencies
import browserSync from 'browser-sync';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
browserSync(
  {
    server: 'web',
    files: ['web/*.*', 'web/*/*.*'],
    cors: true,
    port,
    codeSync: true,
  },
  () => {
    console.info(`Running at http://localhost:${port}`);
  },
);
