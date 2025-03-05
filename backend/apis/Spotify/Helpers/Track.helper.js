import conn from "../../../index.js";

export const getLikedSongs = (id) => {
    return new Promise((resolve, reject) => {
        console.log("helper 1 called...");

        const query = `SELECT liked_by FROM tblsongs WHERE song_id = ?`;

        conn.query(query, [id], (err, results) => {
            if (err) {
                console.error("DB Error:", err);
                return reject(err);
            }

            if (results.length === 0 || !results[0].liked_by) {
                return resolve([]); // Return an empty array if no data found
            }

            const user_id = results[0].liked_by
                ? results[0].liked_by.split(",").map(id => id.trim())
                : [];
            console.log(user_id);
            resolve(user_id);
        });
    });
};

export const setLikedTracks = (oldIds, newId) => {
    console.log("Second helper called...");

    let trackArray = Array.isArray(oldIds) ? oldIds : [];

    if (!trackArray.includes(newId)) {
        trackArray.push(newId);
    }
    
    const newString = trackArray.join(",");
    console.log("Updated playlist:", newString);

    return newString;
};
