const puppeteer = require('puppeteer');
const {detection} = require("./detection");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--window-size=1075,745',
        ],
        defaultViewport: {
            height: 576,
            width: 1024
        }
    });
    const page = await browser.newPage();
    await page.goto('https://v6p9d9t4.ssl.hwcdn.net/html/5549702/index.html');

    await page.waitForNetworkIdle();

    await page.waitForTimeout(8000);

    while (true) {
        const buffer = await page.screenshot({type: 'jpeg', encoding: 'binary', quality: 33})

        const [
            orangeKeys, // keys to press
            greenKeys,  // already pressed keys
            redKeys     // keys to release
        ] = await detection(buffer);

        const keysPressed = [...greenKeys, ...orangeKeys];

        Promise.allSettled(redKeys.map(key => page.keyboard.up(key)));
        Promise.allSettled(keysPressed.map(key => page.keyboard.down(key)));
    }

    await browser.close();
})();
