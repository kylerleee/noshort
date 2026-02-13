browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.includes("/shorts")) {
        browser.tabs.update(tabId, { url: 'https://www.youtube.com/' });
    }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.includes("/reels")) {
        browser.tabs.update(tabId, { url: 'https://www.instagram.com/' });
    }
});

