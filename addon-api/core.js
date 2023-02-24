/*
    api with shared functions for userscripts
*/

var addonApi = {}

class Instance {
    constructor(addon) {
        this.addon = addon
    }

    injectCss(stylesheet = "style.css") {
        $('head').append(`<link rel="stylesheet" href="${browser.runtime.getURL(`/addons/${this.addon.id}/${stylesheet}`)}">`)
    }
}

export {
    Instance
}