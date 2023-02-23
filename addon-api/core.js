/*
    api with shared functions for userscripts
*/

var addonApi = {}

class Instance {
    constructor(addon) {
        this.addon = addon
    }

    injectCss() {
        $('head').append(`<link rel="stylesheet" href="${browser.runtime.getURL(`/addons/${this.addon.id}/style.css`)}">`)
    }
}

export {
    Instance
}