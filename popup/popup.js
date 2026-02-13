const updateInputStates = () => {
    const isEnabled = document.getElementById('EnableExtension').checked;
    
    document.getElementById('HideUtubeShorts').disabled = !isEnabled;
    document.getElementById('HideUtubeShortsTab').disabled = !isEnabled;
    document.getElementById('RedirectUtubeShorts').disabled = !isEnabled;
    document.getElementById('HideIGShorts').disabled = !isEnabled;
    document.getElementById('HideIGShortsTab').disabled = !isEnabled;
    document.getElementById('RedirectIGShorts').disabled = !isEnabled;
};

const saveSettings = async () => {

    const settings = {
        HideUtubeShorts: document.getElementById('HideUtubeShorts').checked,
        HideUtubeShortsTab: document.getElementById('HideUtubeShortsTab').checked,
        RedirectUtubeShorts: document.getElementById('RedirectUtubeShorts').checked,
        EnableExtension: document.getElementById('EnableExtension').checked,
        HideIGShorts: document.getElementById('HideIGShorts').checked,
        HideIGShortsTab: document.getElementById('HideIGShortsTab').checked,
        RedirectIGShorts: document.getElementById('RedirectIGShorts').checked

    };
    await browser.storage.local.set({ userSettings: settings });
    console.log("Settings saved!");
}

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('settings');

    const result = await browser.storage.local.get("userSettings");
    
    if (result.userSettings) {
        const s = result.userSettings;
        document.getElementById('HideUtubeShorts').checked = !!s.HideUtubeShorts;
        document.getElementById('HideUtubeShortsTab').checked = !!s.HideUtubeShortsTab;
        document.getElementById('RedirectUtubeShorts').checked = !!s.RedirectUtubeShorts;
        document.getElementById('EnableExtension').checked = !!s.EnableExtension;
        document.getElementById('HideIGShorts').checked = !!s.HideIGShorts;
        document.getElementById('HideIGShortsTab').checked = !!s.HideIGShortsTab;
        document.getElementById('RedirectIGShorts').checked = !!s.RedirectIGShorts;
    }

    updateInputStates();

    document.getElementById('EnableExtension').addEventListener('change', updateInputStates);
   
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await saveSettings();
    } )
})