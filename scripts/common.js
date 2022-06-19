import browser from 'webextension-polyfill';

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
