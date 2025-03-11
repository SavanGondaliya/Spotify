import conn from "../../../index.js";

export const getLikedSongs = (id) => {
    return new Promise((resolve, reject) => {

        const query = `SELECT liked_songs FROM tbluser WHERE user_id = ?`;
        console.log(query);
        
        conn.query(query, [id], (err, results) => {
            if (err) {
                console.error("DB Error:", err);
                return reject(err);
            }

            if (results.length === 0 || !results[0].liked_songs) {
                return resolve([]); // Return an empty array if no data found
            }

            const user_id = results[0].liked_songs
                ? results[0].liked_songs.split(",").map(id => id.trim())
                : [];
            console.log(results);
            resolve(user_id);
        });
    });
};

export const setLikedTracks = (oldIds, newId) => {

    let trackArray = Array.isArray(oldIds) ? oldIds : [];

    if (!trackArray.includes(newId)) {
        trackArray.push(newId);
    }
    
    const newString = trackArray.join(",");

    return newString;
};

export const removeTrack = (oldIds, newId) => {

    let trackArray = Array.isArray(oldIds) ? oldIds : [];

    if (trackArray.includes(newId)) {
        trackArray.filter(num => num !== newId);
    }
    
    const newString = trackArray.join(",");

    return newString;
};

