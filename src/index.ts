import puppeteer from "puppeteer";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// async function testBot() {
//   const browser = await puppeteer.launch({ headless: false });
//   const selector = 'input[name="search_query"]';
//   try {
//     const page = await browser.newPage();
//     await page.goto("https://www.youtube.com", {
//       waitUntil: "domcontentloaded",
//     });
//     await page.waitForSelector(selector);
//     await page.click("input.yt-searchbox-input");
//     await page.type(selector, "whosdis?");
//     await page.keyboard.press("Enter");
//     await delay(3000);
//   } catch (err) {
//     console.log("error occured", err);
//   } finally {
//     await browser.close();
//   }
// }

// testBot();

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  // const wordsWrapper = "div#wordsWrapper";
  const page = await browser.newPage();
  const cookiesModal = "dialog#cookiesModal";
  try {
    await page.goto("https://www.monkeytype.com", {
      waitUntil: "domcontentloaded",
    });
    if (cookiesModal) {
      await page.click("button.rejectAll");
    }

    // focusing the typing area
    await page.waitForSelector(".word");

    // extract the word list
    const words = await page.$$eval(".word", (els) =>
      els.map((el) => el.textContent?.trim() || ""),
    );

    console.log(words);
    for (const word of words) {
      await page.keyboard.type(word + " ");
    }

    await delay(5000);
  } catch (err) {
    console.log("error occured", err);
  } finally {
    // await browser.close()
  }
}

main();
