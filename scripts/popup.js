import browser from 'webextension-polyfill';
import OptionsSync from 'webext-options-sync';

const options = new OptionsSync({
    defaults: {
        countryCode: '91',
        phoneNumber: '',
    },
    migrations: [
        OptionsSync.migrations.removeUnused
    ],
    logging: true
});

options.getAll()
    .then(function ({ countryCode, phoneNumber }) {
        document.getElementById('start-chat-cc').value = countryCode || '';
        document.getElementById('start-chat-phone').value = phoneNumber || '';
    });

function replaceNonDigits() {
    const replaced = this.value?.trim()?.replaceAll(/[^\d]/g, '');
    if (replaced !== this.value) {
        this.value = replaced;
    }
}

document.getElementById('start-chat-cc')
    .addEventListener('change', replaceNonDigits);
document.getElementById('start-chat-phone')
    .addEventListener('change', replaceNonDigits);

document.getElementById('start-chat-form')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        const countryCode = document.getElementById('start-chat-cc').value;
        const phoneNumber = document.getElementById('start-chat-phone').value;
        browser.runtime.sendMessage({
            type: "open_wame_link",
            href: 'https://wa.me/' + countryCode + phoneNumber,
        });
        options.setAll({ countryCode, phoneNumber })
            .then(function () {
                window.close();
            });
    });

window.addEventListener('load', function () {
    browser.runtime.sendMessage({ type: "wake_service_worker" });
});
