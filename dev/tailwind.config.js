const cfg = require('@tierklinik-dobersberg/tailwind');

module.exports = {
    ...cfg.default,

    content: [
        "./**/*.{html,ts,css,scss}",
    ],
}