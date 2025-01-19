import React from 'react';
import './PublicationsList.css';

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
                    <span>{pub['self-citation'] | 'N/A'}</span>
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
