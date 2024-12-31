const puppeteer = require('puppeteer');
const fs = require('fs');

// Helper function for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function calculateSelfCitations(link, authors) {
    if (!link) return 0;

    try {
        console.log(`Scraping data from: ${link}`);

        // Launch Puppeteer
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Recommended for Puppeteer on some environments
        });
        const page = await browser.newPage();

        // Set a user agent and headers
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        );
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
        });

        const content = await page.content();

        await page.goto(link, {
            waitUntil: 'networkidle2', // Wait for all network requests to finish
            timeout: 60000,
        });

        // console.log("Page Content:", content);

        // Save session cookies for future reuse
        const cookies = await page.cookies();
        fs.writeFileSync('./session.json', JSON.stringify(cookies, null, 2));
        console.log('Session cookies saved.');

        // await page.waitForSelector("span[data-test-id='author-list'] a span", { visible: true, timeout: 30000 });

        // Wait for the citing authors section to load
        // await page.waitForSelector("div[data-test-id='total-citations-stat']", { visible: true, timeout: 30000 });
        await page.waitForSelector('div[data-test-id="total-citations-stat"]', { visible: true, timeout: 30000 });

        const citingLink = await page.evaluate(() => {
            const linkElement = document.querySelector(
                "div[data-test-id='total-citations-stat'] a"
            );
            return linkElement ? linkElement.href.trim() : null;
        });

        console.log(citingLink)

        await browser.close();

        const browserCiting = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Recommended for Puppeteer on some environments
        });
        const pageCiting = await browserCiting.newPage();

        // Set a user agent and headers
        await pageCiting.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        );
        await pageCiting.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
        });

        const contentCiting = await pageCiting.content();

        await pageCiting.goto(citingLink, {
            waitUntil: 'networkidle2', // Wait for all network requests to finish
            timeout: 60000,
        });

        // console.log("Page Content:", content);

        // Save session cookies for future reuse
        const cookiesCiting = await pageCiting.cookies();
        fs.writeFileSync('./session.json', JSON.stringify(cookiesCiting, null, 2));
        console.log('Session cookies saved.');

        await pageCiting.waitForSelector("div.paper-detail-content-card[data-test-id='cited-by'] span[data-test-id='author-list'] a span", { visible: true, timeout: 30000 });

        const citingAuthors = await pageCiting.evaluate(() => {
            const authorsList = [];
            document.querySelectorAll("div.paper-detail-content-card[data-test-id='cited-by'] span[data-test-id='author-list'] a span").forEach((el) => {
                authorsList.push(el.innerText.trim())
            });
            return authorsList
        });

        console.log(`Citing authors extracted: ${citingAuthors}`);

        // Count self-citations
        const selfCitationsCount = citingAuthors.filter((author) =>
            authors.includes(author)
        ).length;

        console.log(`Self-citations found: ${selfCitationsCount}`);

        // Close the browser
        await browserCiting.close();

        return selfCitationsCount;
    } catch (error) {
        console.error(`Error fetching data from ${link}:`, error);

        // Make sure the browser closes even if an error occurs
        if (browser) await browser.close();
        if (browserCiting) await browserCiting.close();

        return 0;
    }
}

// Example Usage
(async () => {
    // const publicationLink = 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85139178768&doi=10.1007%2fs11334-022-00489-9&partnerID=40&md5=4ba99deb1115d80377b8bbc32f71ccb6';
    const publicationLink = 'https://www.semanticscholar.org/search?q=A%20complete%20review%20of%20computational%20methods%20for%20human%20and%20HIV-1%20protein%20interaction%20prediction&sort=relevance'
    const authors = []; // Replace with actual authors

    const selfCitations = await calculateSelfCitations(publicationLink, authors);
    console.log(`Self-Citations: ${selfCitations}`);
})();




