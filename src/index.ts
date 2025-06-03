import puppeteer from "puppeteer";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function testBot() {
  const browser = await puppeteer.launch({ headless: false });
  const selector = 'input[name="search_query"]';
  try {
    const page = await browser.newPage();
    await page.goto("https://www.youtube.com", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector(selector);
    await page.click("input.yt-searchbox-input");
    await page.type(selector, "whosdis?");
    await page.keyboard.press("Enter");
    await delay(3000);
  } catch (err) {
    console.log("error occured", err);
  } finally {
    await browser.close();
  }
}

testBot();
