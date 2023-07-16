const REAL_ESTATE_TYPES = Object.freeze({
    SELL: 0,
    HIRE: 1,
});

const NEWS_TYPE = Object.freeze({
    HOME: 0,
    NEWS: 1,
});

const API_URL = location.href.indexOf('github') != -1 ? 'https://tranlequocthong313.github.io/btl_thietkeweb_batdongsan' : '';

export {
    REAL_ESTATE_TYPES,
    API_URL
};
