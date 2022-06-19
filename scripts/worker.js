import { startChat } from "./common";
import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener(function ({ type, href }) {
    if (type !== "open_wame_link") return;
    browser.tabs.query({ url: "*://web.whatsapp.com/*" })
        .then(function ([tab]) {
            if (!tab) return;
            browser.tabs.update(tab.id, { active: true, highlighted: true });
            browser.scripting.executeScript({
                target: { tabId: tab.id },
                func: startChat,
                args: [href],
            });
        });
});
