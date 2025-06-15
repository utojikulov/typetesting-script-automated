import { SELECTORS } from "../selectors/selectors.js";
import { Page } from "puppeteer";
import { delay } from "./utils.js";

export const monkeyTypeHandler = async (page: Page, wpm: number) => {
    try {
        await page.goto(SELECTORS.monkUrl, { waitUntil: "domcontentloaded" });

        const rejectCookiesBtn = "button.rejectAll";
        if (await page.$(rejectCookiesBtn)) {
            await page.click(rejectCookiesBtn);
        }

        await page.waitForSelector(".word");

        const words = await page.$$eval(".word", (els) =>
            els.map((el) => el.textContent?.trim() || ""),
        );

        const baseDelay = SELECTORS.baseDelay / wpm;

        console.log(words, words.length);
        for (const word of words) {
            await page.keyboard.type(word + "");
            // const offset = Math.random() * 100 - 50;
            return delay(wpm);
        }

        await delay(8000);
    } catch (err) {
        throw new Error("Something went wrong in monkeyTypeHandler function");
    }
};
