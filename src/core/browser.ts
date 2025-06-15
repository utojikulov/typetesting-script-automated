import puppeteer, { Browser, Page } from "puppeteer";

export async function launchBrowser(): Promise<Browser> {
    return puppeteer.launch({ headless: false });
}

export async function newPage(browser: Browser): Promise<Page> {
    return browser.newPage();
}
