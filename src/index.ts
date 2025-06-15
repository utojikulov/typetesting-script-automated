import { launchBrowser, newPage } from "./core/browser.js";
import { monkeyTypeHandler } from "./core/monkeytype.js";

async function main() {
    const browser = await launchBrowser();
    const page = await newPage(browser);

    try {
        await monkeyTypeHandler(page, 70);
    } catch (err) {
        throw new Error("You are cooked. Look at this:");
    } finally {
        // await browser.close();
    }
}

main();
