console.log("Loading Canvas Addons!")

$.getJSON(chrome.extension.getURL('/addons/addons.json'), async function(addons) {
    var storage = await browser.storage.local.get()

    addons.forEach(await async function(addon) {
        var enabled = false        
        if (storage[addon] === undefined) {
            storage[addon] = enabled
            browser.storage.local.set(storage)
        } else
            enabled = storage[addon]

        if (enabled) {
            try {
                var userscript = await import(browser.runtime.getURL(`/addons/${addon}/userscript.js`))
            } catch (e) {
                if (e) {
                    console.error(`Failed to load ${addon} userscript!`)
                    console.error(e)
                }
            }
        }

        console.log(`${addon} loaded!`)
    });
});