import { Config } from '../model/config';

let config: Config;

export const getConfig = (): Config => config;

export const setConfig = (newConfig: Partial<Config>): Config => {
  config = {
    ...(config || {}),
    ...newConfig,
  };
  return config;
};
