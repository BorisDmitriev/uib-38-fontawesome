const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe("Font awesome CDN", () => {
    it("Page should contain a Font awesome CDN link", async () => {
        try {
            const html = await page.content();
            expect(html).toMatch(/https.*fontawesome/);
        } catch (error) {
            throw error;
        }
    });
});

describe("H1 tag", () => {
    it("`H1` tag should have font awesome icon", async () => {
        try {
            const h1 = await page.$eval('h1', el => el.innerHTML);
            const iconTags = h1.match(/<i.*?>/g);
            expect(iconTags.length).toBeGreaterThan(1);
        } catch (error) {
            throw error;
        }
    });
    it("`H1` tag should be centered", async () => {
        try {
            const h1Center = await page.$eval('h1', el => getComputedStyle(el).textAlign);
            expect(h1Center).toBe('center');
        } catch (error) {
            throw error;
        }
    });
    it("`H1` tag should be underlined", async () => {
        try {
            const h1Underline = await page.$eval('h1', el => getComputedStyle(el).textDecoration);
            expect(h1Underline).toMatch(/underline/);
        } catch (error) {
            throw error;
        }
    });
});

describe("Review", () => {
    it("`.review` element should be centered", async () => {
        try {
            const review = await page.$eval('.review', el => getComputedStyle(el).textAlign);
            expect(review).toBe('center');
        } catch (error) {
            throw error;
        }
    });
    it("`.review` element should have text shadow", async () => {
        try {
            const reviewShadow = await page.$eval('.review', el => getComputedStyle(el).textShadow);
            expect(reviewShadow).not.toBe('none');
        } catch (error) {
            throw error;
        }
    });
    it("`.review` element should be uppercase", async () => {
        try {
            const reviewUppercase = await page.$eval('.review', el => getComputedStyle(el).textTransform);
            expect(reviewUppercase).toBe('uppercase');
        } catch (error) {
            throw error;
        }
    });
});

describe("Info paragraphs", () => {
    it("`p` tags in `.info` should contain font awesome icons ", async () => {
        try {
            const pTags = await page.$$('.info p');
            for (let i = 0; i < pTags.length; i++) {
                const pTag = pTags[i];
                const pTagHtml = await page.evaluate(el => el.innerHTML, pTag);
                const iconTags = pTagHtml.match(/<i.*?>/g);
                expect(iconTags.length).toBeGreaterThan(0);
            }
        } catch (error) {
            throw error;
        }
    });
});