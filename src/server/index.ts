/* eslint-disable no-console */
import log from 'loglevel';
import * as http from 'http';
// eslint-disable-next-line import/no-extraneous-dependencies
import serverHandler from 'serve-handler';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ngrok from 'ngrok';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const server = http.createServer((request, response) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  serverHandler(request, response, {
    public: './web',
  }),
);

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

const runNgrok = async (): Promise<void> => {
  const url = await ngrok.connect(port);
  log.warn(`Listening on: ${url}`);
};

runNgrok().catch((ex) => {
  const { stack, message } = ex as Error;
  console.error('Error running ngrok', stack || message);
});
