const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// API endpoint for publications
router.get('/api/publications', (req, res) => {
    const results = [];
    console.log(__dirname, '../data/scopus.csv')
    fs.createReadStream(path.join(__dirname, '../data/scopus.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const path = require('path');
// const puppeteer = require('puppeteer');

// // Load CSV parsing library
// const csv = require('csv-parser');

// const csvFilePath = path.join(__dirname, '../data/scopus.csv');

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // Function to calculate self-citations using Puppeteer
// async function calculateSelfCitations(link, authors) {
//     if (!link) return 0;

//     let browser;
//     try {
//         // Launch Puppeteer
//         browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();

//         console.log(`Visiting ${link}`);
//         await page.goto(link, { waitUntil: 'networkidle2', timeout: 0 });

//         // Extract citing authors
//         const citingAuthors = await page.evaluate(() => {
//             const authorsList = [];
//             // Update the selector to match the citing authors on the page
//             document.querySelectorAll('.citing-author-class').forEach((el) => {
//                 authorsList.push(el.innerText.trim());
//             });
//             return authorsList;
//         });

//         console.log(`Citing authors: ${citingAuthors}`);

//         // Count self-citations
//         const selfCitationsCount = citingAuthors.filter((author) =>
//             authors.includes(author)
//         ).length;

//         console.log(`Self-citations: ${selfCitationsCount}`);
//         return selfCitationsCount;
//     } catch (error) {
//         console.error(`Error scraping ${link}: ${error.message}`);
//         return 0;
//     } finally {
//         if (browser) await browser.close();
//     }
// }

// // Function to process the CSV file and calculate self-citations
// async function processPublications() {
//     const publications = [];
//     return new Promise((resolve, reject) => {
//         fs.createReadStream(csvFilePath)
//             .pipe(csv())
//             .on('data', async (row) => {
//                 const authors = row["﻿\"Authors\""].split(','); // Assuming authors are comma-separated
//                 await delay(2000); // Delay to avoid rate limiting
//                 const selfCitations = await calculateSelfCitations(row.Link, authors);

//                 publications.push({
//                     title: row.Title,
//                     citedBy: parseInt(row['Cited by'], 10) || 0,
//                     year: parseInt(row.Year, 10) || 0,
//                     selfCitations: selfCitations,
//                 });
//             })
//             .on('end', () => {
//                 resolve(publications);
//             })
//             .on('error', (err) => {
//                 reject(err);
//             });
//     });
// }

// // Define API endpoint
// router.get('/api/publications', async (req, res) => {
//     try {
//         const publications = await processPublications();
//         res.json(publications);
//     } catch (error) {
//         console.error('Error processing publications:', error.message);
//         res.status(500).json({ error: 'Failed to process publications' });
//     }
// });

// module.exports = router;

