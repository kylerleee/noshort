const MINI_TAB = "ytd-guide-entry-renderer>a[title='Shorts']";
const HOME_SHORTS = "ytd-rich-section-renderer";
const UTUBER_SHORTS = "ytd-item-section-renderer ytd-reel-shelf-renderer";
const UTUBER_SHORTS_SPECIFIC = "div ytm-shorts-lockup-view-model-v2";
const IG_SHORTS_POST = "ul video";
const IG_SHORTS = "article:has(video):not(:has(ul))";
const IG_SHORTS_TAB = "a[href='/reels/']";

function updateStyles(settings) {
  let styleEl = document.getElementById('shorts-hider-styles');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'shorts-hider-styles';
    document.head.appendChild(styleEl);
  }

  console.log(settings.EnableExtension);
  if (settings.EnableExtension === false) {
    console.log("Extension disabled, removing styles.");
    styleEl.textContent = "";
    return;
  }

  else {
    styleEl.textContent = settings.HideUtubeShorts 
    ? `${HOME_SHORTS} { display: none !important; }\n`
    + `${UTUBER_SHORTS} { display: none !important; }\n`
    + `${UTUBER_SHORTS_SPECIFIC} { display: none !important; }`
    : "";

    styleEl.textContent += settings.HideUtubeShortsTab 
      ? `${MINI_TAB} { display: none !important; }\n`
      : "";

    styleEl.textContent += settings.HideIGShorts
      ? `${IG_SHORTS_POST} { display: none !important; }\n`
      + `${IG_SHORTS} { display: none !important; }\n`
      : "";

    styleEl.textContent += settings.HideIGShortsTab
      ? `${IG_SHORTS_TAB} { display: none !important; }\n`
      : "";
  }

  
}

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.userSettings) {
    console.log("User settings changed:", changes.userSettings.newValue);
    const newSettings = changes.userSettings.newValue;
    updateStyles(newSettings);
  }
});

browser.storage.local.get("userSettings").then((result) => {
  if (result.userSettings) {
    console.log("Initializing NoShorts with user settings:", result.userSettings);
    updateStyles(result.userSettings);
  }
});