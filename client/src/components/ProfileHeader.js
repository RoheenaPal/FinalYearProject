import React from 'react';
import './ProfileHeader.css';

function ProfileHeader() {
    return (
        <div className="profile-header">
            {/* <img src="profile-photo-url" alt="Profile" className="profile-photo" /> */}
            <div className="profile-details">
                <h1>Dr. Kartick Chandra Mondal</h1>
                <p>Assistant Professor at Jadavpur University</p>
                <p>Verified email at jadavpuruniversity.in - <a href="https://sites.google.com/site/mrkartickchandramondal/">Home Page</a></p>
                <div className="tags">
                    <span>Data Mining</span>
                    <span>Bioinformatics</span>
                    <span>Cloud Computing</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
