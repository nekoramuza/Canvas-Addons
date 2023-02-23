import { Instance } from "/addon-api/core.js"

export const info = {
    "name": "Dark Mode",
    "description": "Adds dark mode to Canvas by Instructure",
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