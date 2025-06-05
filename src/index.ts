import puppeteer from "puppeteer";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  // const wordsWrapper = "div#wordsWrapper";
  const page = await browser.newPage();
  try {
    await page.goto("https://www.monkeytype.com", {
      waitUntil: "domcontentloaded",
    });
    const rejectCookiesBtn = "button.rejectAll";
    if (await page.$(rejectCookiesBtn)) {
      await page.click(rejectCookiesBtn);
    }

    // ensure words are rdy
    await page.waitForSelector(".word");

    // focusing the typing area
    // await page.click("div#words");

    // extract the word list
    const words = await page.$$eval(".word", (els) =>
      els.map((el) => el.textContent?.trim() || ""),
    );

    console.log(words, words.length);
    for (const word of words) {
      await page.keyboard.type(word + " ");
      await delay(450);
    }

    await delay(5000);
  } catch (err) {
    console.log("error occured", err);
  } finally {
    await browser.close();
  }
}

main();
