import browser from "webextension-polyfill";

function startChat(link) {
    const existing = document.getElementById('opener');
    if (!!existing) {
        existing.setAttribute('href', link);
        existing.click();
    } else {
        const a = document.createElement('a');
        a.id = 'opener';
        a.style.display = 'none';
        a.setAttribute('href', link);
        const header = document.getElementsByTagName('header')[0];
        header.appendChild(a);
        a.click();
    }
}

browser.runtime.onMessage.addListener(function ({ type, href }) {
    if (type !== "open_wame_link") return;
    browser.tabs.query({ url: "*://web.whatsapp.com/*" })
        .then(function ([tab]) {
            if (!!tab) {
                browser.tabs.update(tab.id, { active: true });
                browser.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: startChat,
                    args: [href],
                });
            } else {
                browser.tabs.create({
                    active: true,
                    url: href,
                });
            }
        });
});
