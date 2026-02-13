browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.includes("/shorts")) {
        browser.storage.local.get("userSettings").then(result => {
            if (result.userSettings && result.userSettings.RedirectUtubeShorts && result.userSettings.EnableExtension) {
                browser.tabs.update(tabId, { url: 'https://www.youtube.com/' });
            }
        });
    }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.includes("/reels")) {
        browser.storage.local.get("userSettings").then(result => {
            if (result.userSettings && result.userSettings.RedirectReels && result.userSettings.EnableExtension) {
                browser.tabs.update(tabId, { url: 'https://www.instagram.com/' });
            }
        });
    }
});

