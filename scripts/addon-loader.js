console.log("Loading Canvas Addons!")

$.getJSON(chrome.extension.getURL('/addons/addons.json'), async function(addons) {
    var storage = await browser.storage.local.get()

    addons.forEach(async addon => {
        var enabled = false        
        if (storage[addon] === undefined) {
            storage[addon] = enabled
            browser.storage.local.set(storage)
        } else
            enabled = storage[addon]

        if (enabled) {
            var userscript = import(browser.extension.getURL(`/addons/${addon}/userscript.js`))
        }

        console.log(`${addon} loaded!`)
    });
});