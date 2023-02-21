var addonList = $('#addons')

var manifest = browser.runtime.getManifest()

$('#version').text(`${manifest.name} - Version ${manifest.version}`)

$.getJSON(browser.extension.getURL('/addons/addons.json'), async function(addons) {
    var storage = await browser.storage.local.get()

    addons.forEach(async addon => {
        var enabled = false        
        if (storage[addon] === undefined) {
            storage[addon] = enabled
            browser.storage.local.set(storage)
        } else
            enabled = storage[addon]

        $.getJSON(browser.extension.getURL(`/addons/${addon}/addon.json`), function(data) {
            var e = $(`<div class="addon">
                <b>${data.name}</b>
                <span>${data.description}</span>
            </div>`)

            var toggleSwitch = $(`<label class="switch">
                <span class="slider round"></span>
            </label>`)

            var toggle = $('<input type="checkbox">')
            
            toggle.prop("checked", storage[addon])
            toggle.change(function() {
                storage[addon] = toggle.is(":checked")
                browser.storage.local.set(storage)
            })

            toggleSwitch.prepend(toggle)
            e.append(toggleSwitch)
            addonList.append(e)
        });
    });
});