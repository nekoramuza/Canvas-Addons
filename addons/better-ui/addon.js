import { Instance } from "/addon-api/core.js"

export const info = {
    "name": "Better UI",
    "description": "Improve the UI for Canvas LMS",
    "version": "1.0.0",
    "settings": {}
}

export const main = {
    init: function() {

    },

    start: function(addon, parameters) {
        var instance = new Instance(addon)

        instance.injectCss()
    }
}