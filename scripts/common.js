import browser from 'webextension-polyfill';

function injectChatOpener() {
    const existing = document.getElementById('opener');
    if (!!existing) return;
    const a = document.createElement('a');
    a.id = 'opener';
    a.style.display = 'none';
    a.setAttribute('href', '');
    const header = document.getElementsByTagName('header')[0];
    header.appendChild(a);
}

export function setUpChatOpener() {
    let timer;
    timer = setInterval(function () {
        const headers = document.getElementsByTagName('header');
        if (headers.length > 0) {
            injectChatOpener();
            clearInterval(timer);
        }
    }, 500);
}

export function setUpClickHandler() {
    if (document.documentElement.getAttribute("wame-hooked") === "true") return;
    document.documentElement.addEventListener("click", function (e) {
        if (e.target.tagName !== "A") return;
        const href = e.target.getAttribute("href");
        if (!href.startsWith("https://wa.me/")) return;
        e.preventDefault();
        browser.runtime.sendMessage({
            type: "open_wame_link",
            href,
        });
    });
    document.documentElement.setAttribute("wame-hooked", "true");
}

export function startChat(link) {
    const a = document.getElementById('opener');
    if (!a) return;
    a.setAttribute('href', link);
    a.click();
}
