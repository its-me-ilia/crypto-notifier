export const HTTP_PORT = process.env.PORT || 4000;
export const WEBURL = process.env.NODE_ENV === "production" ? "$WEBSITEURL$" : `http://localhost:${HTTP_PORT}`;
export const REDIS_NEWEST_KEY = 'newest_cryptos';
export const SELECTED_MOBILE_NUMBERS=['xxxxxxxxx'];
export const SELECTED_EMAILS=['xxxx@xxx.com'];
