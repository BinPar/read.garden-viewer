import { Config } from '../model/config';

import defaultConfig from './default';

let config: Config = {
  ...defaultConfig,
};

console.log('Initial default config: ', JSON.stringify(config, null, 2));

export const getConfig = (): Config => config;

export const setConfig = (newConfig: Partial<Config>): void => {
  config = {
    ...config,
    ...newConfig,
  };
};
