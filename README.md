# Instant WebChat

Browser extension to start chat on WhatsApp without saving phone number.

This extension was initially developed to help increase productivity of our customer service team and save their time.
Later it was realized that it can be of help for a lot of organizations.

### Features

- Start chats with unknown number (without saving)
- Start chats from anywhere when clicked on wa.me links

### Building

To build and load (unpacked) extension locally, make sure you have [Node.js](https://nodejs.org/en/) installed and run below commands:

```shell
# get the dependencies
yarn install

# pack javascript files
npm run build

# watch for changes during development
npm run watch

# package for distribution
npm run package
```

### License

See [LICENSE](LICENSE) file.
