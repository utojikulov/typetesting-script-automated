// launch/close the browser or smth

import puppeteer from "puppeteer";
import { SELECTORS } from "../selectors/selectors.js";

export async function browser() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(SELECTORS.monkUrl);
  } catch (err) {
    console.log("Error occured when launching browser", err);
  }
}
