if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  require('dotenv').config();
}

export const cdnDomain = process.env.CDN_DOMAIN;
export const encryptIndexes = (process.env.INDEXES || '').split(',').map((item) =>
  parseInt(item, 10),
) as number[];
