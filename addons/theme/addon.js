import { Instance } from "/addon-api/core.js"

export const info = {
    "name": "Theme",
    "description": "Allows you to change the color of the UI on Canvas LMS",
    "version": "1.0.0",
    "settings": {
        "primary_color": {
            "label": "Primary Color",
            "type": "color",
            "default": "#1d5585"
        },
        "background_color": {
            "label": "Background Color",
            "type": "color",
            "default": "#FFFFFF"
        },
        "text_primary": {
            "label": "Primary Text Color",
            "type": "color",
            "default": "#202D36"
        },
        "text_secondary": {
            "label": "Secondary Text Color",
            "type": "color",
            "default": "#2D3B45"
        }
    }
}

// stolen from https://gist.github.com/w3core/e3d9b5b6d69a3ba8671cc84714cca8a4#file-brightnessbycolor-js
function brightnessByColor (color) {
    var color = "" + color, isHEX = color.indexOf("#") == 0, isRGB = color.indexOf("rgb") == 0;
    if (isHEX) {
        var m = color.substr(1).match(color.length == 7 ? /(\S{2})/g : /(\S{1})/g);
        if (m) var r = parseInt(m[0], 16), g = parseInt(m[1], 16), b = parseInt(m[2], 16);
    }
    if (isRGB) {
        var m = color.match(/(\d+){3}/g);
        if (m) var r = m[0], g = m[1], b = m[2];
    }
    if (typeof r != "undefined") return ((r*299)+(g*587)+(b*114))/1000;
}

export const main = {
    init: function() {

    },

    start: function(addon, parameters) {
        var instance = new Instance(addon)

        $(document.documentElement).css("--change-primary-color", parameters.primary_color)
        $(document.documentElement).css("--background-color-dark", parameters.background_color)
        $(document.documentElement).css("--color-dark-primary", parameters.text_primary)
        $(document.documentElement).css("--color-dark-secondary", parameters.text_secondary)
        instance.injectCss("primary.css")
        instance.injectCss("background.css")
    }
}