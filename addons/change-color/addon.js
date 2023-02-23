import { Instance } from "/addon-api/core.js"

export const info = {
    "name": "Change Color",
    "description": "Allows you to change the primary color for Canvas LMS",
    "version": "1.0.0",
    "settings": {
        "color": {
            "type": "color",
            "default": "#3890ce"
        }
    }
}

export const main = {
    init: function() {

    },

    start: function(addon, parameters) {
        var instance = new Instance(addon)

        $(document.documentElement).css("--change-primary-color", parameters.color)
        instance.injectCss()
    }
}