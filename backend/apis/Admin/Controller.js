import conn from "../../index.js"

export const getUsers = async(req,res) => {
    try {
        const sql = "SELECT user_id, name, email, image, created_at FROM tbluser";
        conn.query(sql, (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(results);
        });
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

export const updateUser = async(req,res) => {
    try {
        const { id } = req.params;
        const { name, email, image, created_at } = req.body;
        
        const sql = "UPDATE tbluser SET name = ?, email = ?, image = ?, created_at = ? WHERE user_id = ?";
        conn.query(sql, [name, email, image, created_at, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User updated successfully" });
        });
        
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
}

export const deleteUser = async(req,res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM tbluser WHERE user_id = ?";
        
        conn.query(sql, [id], (err, result) => {
          if (err) return res.status(400).json({ error: err.message });
          res.json({ message: "User deleted successfully" });
        });
      
   } catch (error) {
        return res.status(500).send({message:error.message});       
   } 
}

export const getArtists = async(req, res) => {
    try {
        conn.query("SELECT * FROM tblartist", (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(result);
        });
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
}

export const updateArtist = async(req, res) => {
    try {
        const { id } = req.params;
        const { artist_name, image } = req.body;
        
        const sql = "UPDATE tblartist SET artist_name = ?, image = ? WHERE artist_id = ?";
        conn.query(sql, [artist_name, image, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Artist updated successfully" });
        });       
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
}

export const deleteArtist = async(req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM tblartist WHERE artist_id = ?";
        
        conn.query(sql, [id], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Artist deleted successfully" });
        });       
    } catch (error) {
        return res.status(500).send({message:error})
    }
}

export const getSongs = async(req, res) => {
    try {
        const sql = `
            SELECT 
                s.song_id, 
                s.title AS song_name, 
                s.duration, 
                a.artist_name, 
                a.image AS artist_image
            FROM tblsongs s
            JOIN tblartist a ON s.artist_id = a.artist_id
            `;
        conn.query(sql, (err, results) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json(results);
        });      
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
} 

export const updateSongDetails = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, artist_id, duration } = req.body;
        
        const sql = "UPDATE tblsongs SET title = ?, artist_id = ?, duration = ? WHERE song_id = ?";
        conn.query(sql, [title, artist_id, duration, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Song updated successfully" });
        });
      
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

export const deleteSong = async(req,res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM tblsongs WHERE song_id = ?";
        
        conn.query(sql, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Song deleted successfully" });
        });    
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}