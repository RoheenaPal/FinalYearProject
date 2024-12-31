import React, { useMemo } from 'react';
import './CoAuthors.css';

// Helper function to parse and format author names
function parseAuthorsAndAffiliations(authorsString, affilString) {
    const authors = authorsString.split(';').map(author => {
        const namePart = author.split('(')[0].trim();
        const [lastName, firstName] = namePart.split(',').map(part => part.trim());
        return `${firstName} ${lastName}`;
    }).filter(name => name); // Remove any empty names

    const affiliations = affilString.split(';').map(affil => affil.trim()).filter(affil => affil);

    // Combine authors with their corresponding affiliations
    return authors.map((author, index) => ({
        name: author,
        affiliation: affiliations[index] || 'No affiliation provided'
    }));
}

function CoAuthors({ publications }) {
    const coAuthors = useMemo(() => {
        const coAuthorsList = [];
        const authorsSet = new Set();

        publications.forEach(pub => {
            if (pub['Author full names'] && pub['Authors with affiliations']) {
                const authorsWithAffiliations = parseAuthorsAndAffiliations(pub['Author full names'], pub['Authors with affiliations']);
                authorsWithAffiliations.forEach(({ name, affiliation }) => {
                    // Check if author is already added to avoid duplicates
                    if (!authorsSet.has(name)) {
                        authorsSet.add(name);
                        coAuthorsList.push({ name, affiliation });
                    }
                });
            }
        });

        return coAuthorsList;
    }, [publications]);

    return (
        <div className="co-authors">
            <h3>Co-authors</h3>
            <ul>
                {coAuthors.map((author, index) => (
                    <li key={index}>
                        <span className="author-name">{author.name}</span>
                        <span className="author-affiliation">{parseAndReturnAffiliation(author.affiliation)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function parseAndReturnAffiliation(affiliation) {
    var nameAffiliation = affiliation.split(",");
    var reqdAffiliation = "";
    for (var index = 1; index < nameAffiliation.length; index += 1) {
        reqdAffiliation += nameAffiliation[index] + ","
    }
    return reqdAffiliation;
}

export default CoAuthors;
