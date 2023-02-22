/*
    api with shared functions for userscripts
*/

var addonApi = {}

addonApi.injectCss = function (addonId) {
    $('head').append(`<link rel="stylesheet" href="${browser.runtime.getURL(`/addons/${addonId}/style.css`)}">`)
}

export default addonApi