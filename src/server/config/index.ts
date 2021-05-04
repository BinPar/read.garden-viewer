if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  require('dotenv').config();
}

// eslint-disable-next-line import/prefer-default-export
export const cdnDomain = process.env.CDN_DOMAIN || 'cdn.emp.binpar.cloud';
