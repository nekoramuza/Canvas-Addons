var addonList = $('#addons')

var manifest = browser.runtime.getManifest()

$('#version').text(`${manifest.name} - Version ${manifest.version}`)

$('#reset').click(function() {
    chrome.storage.local.clear()
    close()
})

$.getJSON(browser.runtime.getURL('/addons/addons.json'), async function(addons) {
    var storage = await browser.storage.local.get()

    addons.forEach(async id => {
        var addonObj = {
            enabled: false,
            settings: {}
        }

        if (storage[id] === undefined) {
            storage[id] = addonObj
            browser.storage.local.set(storage)
        } else
            addonObj = storage[id]
        
        await import(browser.runtime.getURL(`/addons/${id}/addon.js`))
        .then(await function(addon) {
            var info = addon.info

            var addonElement = $(`<div class="addon">
                <h2>${info.name} v${info.version}</h2>
                <span>${info.description}</span>
            </div>`)

            addonList.append(addonElement)

            var toggleSwitch = $(`<label class="switch">
                <span class="slider round"></span>
            </label>`)

            var toggle = $('<input type="checkbox">')

            var settings = $(`<div id="settings"></div>`)

            Object.keys(info.settings).forEach(setting => {
                var settingObj = info.settings[setting]
                var value = storage[id].settings[setting]

                if (value === undefined) {
                    storage[id].settings[setting] = settingObj.default
                    value = settingObj.default
                    browser.storage.local.set(storage)
                }

                var settingDiv = $(`<div class="setting">
                    <b>${settingObj.label}</b>
                </div>`)

                var settingInput = $(`<input type="${settingObj.type}" value="${value}">`)

                settingInput.change(function() {
                    addonObj.settings[setting] = settingInput.val()
                    storage[id].settings[setting] = settingInput.val()
                    browser.storage.local.set(storage)
                })

                settingDiv.append(settingInput)
                settings.append(settingDiv)
            })
            
            toggle.prop("checked", storage[id].enabled)

            toggle.change(function() {
                storage[id].enabled = toggle.is(":checked")
                browser.storage.local.set(storage)
            })

            toggleSwitch.prepend(toggle)
            addonElement.append(toggleSwitch)

            if (Object.keys(info.settings).length > 0) {
                addonElement.append($(`<h2>Settings</h2>`))
                addonElement.append(settings)
            }
        })
    });
});