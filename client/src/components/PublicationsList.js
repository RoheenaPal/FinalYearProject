import React from 'react';
import './PublicationsList.css';

const puppeteer = require('puppeteer');

// async function calculateSelfCitations(publicationTitle) {
//     const link = `https://www.semanticscholar.org/search?q=${publicationTitle}`;
//     var authors = [];
//     if (!link) return 0;

//     let browser;
//     try {
//         console.log(`Scraping data from: ${link}`);

//         // Launch Puppeteer
//         browser = await puppeteer.launch({
//             headless: false,
//             args: ['--no-sandbox', '--disable-setuid-sandbox'], // Recommended for Puppeteer on some environments
//         });
//         const page = await browser.newPage();

//         // Set a user agent and headers
//         await page.setUserAgent(
//             'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
//         );
//         await page.setExtraHTTPHeaders({
//             'Accept-Language': 'en-US,en;q=0.9',
//         });

//         await page.goto(link, {
//             waitUntil: 'networkidle2', // Wait for all network requests to finish
//             timeout: 60000,
//         });

//         // Wait for citing info to load
//         await page.waitForSelector('div[data-test-id="total-citations-stat"] a', {
//             visible: true,
//             timeout: 30000,
//         });

//         // Get citing link
//         const citingLink = await page.evaluate(() => {
//             const linkElement = document.querySelector(
//                 "div[data-test-id='total-citations-stat'] a"
//             );
//             return linkElement ? linkElement.href.trim() : null;
//         });

//         if (!citingLink) {
//             console.error('Citing link not found.');
//             return 0;
//         }

//         console.log(`Citing link found: ${citingLink}`);

//         // Navigate to the citing page
//         await page.goto(citingLink, {
//             waitUntil: 'networkidle2',
//             timeout: 600000,
//         });

//         // Wait for the citing authors section to load
//         await page.waitForSelector("div.paper-detail-content-card[data-test-id='cited-by'] span[data-test-id='author-list'] a span", {
//             visible: true,
//             timeout: 300000,
//         });

//         // Extract citing authors
//         const citingAuthors = await page.evaluate(() => {
//             const authorsList = [];
//             document
//                 .querySelectorAll("div.paper-detail-content-card[data-test-id='cited-by'] span[data-test-id='author-list']")
//                 .forEach((el) => {
//                     authorsList.push(el.innerText.trim());
//                 });
//             return authorsList;
//         });

//         console.log(`Citing authors extracted: ${citingAuthors}`);

//         // Count self-citations
//         const selfCitationsCount = citingAuthors.filter((author) =>
//             authors.includes(author)
//         ).length;

//         console.log(`Self-citations found: ${selfCitationsCount}`);
//         return selfCitationsCount;
//     } catch (error) {
//         console.error(`Error fetching data from ${link}:`, error);
//         return 0;
//     } finally {
//         // Ensure the browser is closed
//         if (browser) await browser.close();
//     }
// }

// function includeSelfCitations(publications) {
//     return publications.map(pub => {
//         const selfCitations = calculateSelfCitations(pub['Source title']) || 0;  // Replace with actual logic
//         return {
//             ...pub,
//             selfCitations
//         };
//     });
// }

function PublicationList({ publications }) {
    return (
        <div className="publications-list">
            <div className="publications-header">
                <span className="header-title">Title</span>
                <span className="header-cited-by">Cited By</span>
                <span className="header-cited-by">Self Citations</span>
                <span className="header-year">Year</span>
            </div>
            {publications.map((pub, index) => (
                <div key={index} className="publication-item">
                    <div className="publication-title">
                        {pub.Title}
                        <div className="publication-authors">
                            {parseAuthors(pub["﻿\"Authors\""])}
                        </div>
                        <div className="publication-source">
                            {pub['Source title']}
                        </div>
                    </div>
                    <span className="cited-count">{pub['Cited by'] || 'N/A'}</span>
                    <span>{pub.selfCitations | 'N/A'}</span>
                    <span className="publication-year">{pub.Year}</span>
                </div>
            ))}
        </div>
    );
}

// Helper function to parse author names
function parseAuthors(authorsString) {
    return authorsString;
}

export default PublicationList;
