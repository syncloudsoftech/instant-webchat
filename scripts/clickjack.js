import browser from "webextension-polyfill";

(function () {
    if (document.documentElement.getAttribute("data-wame") === "hooked") return;

    document.documentElement.addEventListener("click", function (e) {
        if (e.target.tagName !== "A") return;
        const href = e.target.getAttribute("href");
        if (!href?.startsWith("https://wa.me/")) return;
        e.preventDefault();
        browser.runtime.sendMessage({
            type: "open_wame_link",
            href,
        });
    });

    document.documentElement.setAttribute("data-wame", "hooked");
})();
