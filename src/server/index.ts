/* eslint-disable no-console */
import log from 'loglevel';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as liveServer from 'live-server';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ngrok from 'ngrok';

const params: liveServer.LiveServerParams = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  root: './web',
  open: false,
  wait: 0,
  ignore: '/src,/dist,/tests',
  logLevel: 2,
  file: 'index.html',
};

liveServer.start(params);

const runNgrok = async (): Promise<void> => {
  const url = await ngrok.connect(params.port);
  log.warn(`Listening on: ${url}`);
};

runNgrok().catch((ex) => {
  const { stack, message } = ex as Error;
  console.error('Error running ngrok', stack || message);
});
