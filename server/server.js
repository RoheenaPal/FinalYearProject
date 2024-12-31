// const express = require('express');
// const path = require('path');
// const csv = require('csv-parser');
// const fs = require('fs');

// const app = express();
// const PORT = 5000;

// const cors = require('cors');
// app.use(cors());


// // Serve the CSV data via an API endpoint
// app.get('/api/publications', (req, res) => {
//     const results = [];
//     fs.createReadStream(path.join(__dirname, 'data', 'scopus.csv'))
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//             res.json(results);
//         });
// });

// // Serve static files for the frontend
// app.use(express.static(path.join(__dirname, '../client/build')));

// const publicationRoutes = require('./routes/publications');
// app.use('/api/publications', publicationRoutes);

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const path = require('path');
const csv = require('csv-parser');
const publicationsRouter = require('./routes/publications');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(publicationsRouter);

// Serve the CSV data via an API endpoint
app.get('/api/publications', (req, res) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, 'data', 'scopus.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

