import { Config } from '../model/config';

import { cdnDomain } from './env';

let config: Config = {
  cdnDomain: cdnDomain || 'cdn.emp.binpar.cloud',
};

console.log('Initial default config: ', JSON.stringify(config, null, 2));

export const getConfig = (): Config => config;

export const setConfig = (newConfig: Partial<Config>): void => {
  config = {
    ...config,
    ...newConfig,
  };
};
