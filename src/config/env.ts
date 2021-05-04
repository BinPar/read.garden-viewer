if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

export const cdnDomain = process.env.CDN_DOMAIN;
