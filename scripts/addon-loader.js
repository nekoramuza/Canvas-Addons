(async function() {
    var storage = await browser.storage.local.get()

    class Addon {
        constructor(id) {
            let Addon = this
            Addon.id = id

            this.addon = import(browser.runtime.getURL(`/addons/${id}/addon.js`))
            .then(function(addon) {
                Addon.name = addon.info.name
                Addon.description = addon.info.description
                Addon.version = addon.info.version
                Addon.settings = addon.info.settings

                Addon.init = addon.main.init
                Addon.start = addon.main.start
            })
        }

        async start(addon, parameters) {
            await this.addon
            this.start(addon, parameters)
        }
    }

    $.getJSON(chrome.extension.getURL('/addons/addons.json'), async function(addons) {
        var storage = await browser.storage.local.get()

        addons.forEach(await async function(id) {
            if (!storage[id])
                return;

            if (storage[id].enabled) {
                var addon = new Addon(id);

                addon.start(addon, storage[id].settings)
            }
        });
    });
})()