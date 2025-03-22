import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MusicLoader from "./Loader";
import axios from "axios";
import Waves from "../../Animations/Waves";

const MonthlyReport = () => {
  const session_details = sessionStorage.getItem("session_details");
  const [page, setPage] = useState(0);
  const [artists, setArtists] = useState({ artists: [] }); 
  const [songs, setSongs] = useState({ tracks: [] });
  const [reportData, setReportData] = useState(null);

  const fetchArtistName = async (ids) => {
    try {
      const res = await axios.get(`http://localhost:5000/artists?ids=${ids}&session_details=${session_details}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        setArtists(res.data); // Ensure response matches expected structure
      }
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const fetchSongName = async (ids) => {
    try {
      const res = await axios.get(`http://localhost:5000/tracks?ids=${ids}&session_details=${session_details}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        setSongs(res.data); // Ensure response matches expected structure
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/report?session_details=${session_details}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          setReportData(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching report data:", error);
      });
  }, []);

  useEffect(() => {
    if (!reportData) return;

    const artistIds = new Set();
    const songIds = new Set();

    reportData.forEach((report) => {
      report?.topArtists?.forEach(([id]) => artistIds.add(id));
      report?.topSongs?.forEach(([id]) => songIds.add(id));
    });

    if (artistIds.size > 0) {
      fetchArtistName(Array.from(artistIds).join(","));
    }

    if (songIds.size > 0) {
      fetchSongName(Array.from(songIds).join(","));
    }
  }, [reportData]);

  if (!reportData) {
    return <div className="text-center text-gray-500"><MusicLoader /></div>;
  }
  
  const pages = [
    {
      title:<p className="text-4xl text-amber-300">Your Report is Ready Steven</p>,
      content:`<p className="text-2xl text-amber-300">This Month Was cold you so You Taste Was Also<p/>`
    },
    {
      title: "Top 5 Most Listened Artists",
      content: artists?.artists?.length > 0 ? (
        artists.artists.map((track, index) => (
          <div key={index} className="flex items-center space-x-3">
            {track?.images?.[0]?.url && (
              <img className="w-10 h-10 rounded" src={track.images[0].url} alt={track?.name} />
            )}
            <Waves/>
            <p className="text-amber-300">{index + 1}. {track?.name} (plays)</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )
    },
    {
      title: "Most Listened Songs",
      content: songs?.tracks?.length > 0 ? (
        songs.tracks.map((track, index) => (
          <div key={index} className="flex items-center space-x-3">
            {track?.album?.images?.[0]?.url && (
              <img className="w-10 h-10 rounded" src={track.album.images[0].url} alt={track?.name} />
            )}
            <p className="text-amber-300">{index + 1}. {track?.name} (plays)</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 w-80 text-center bg-white shadow-lg rounded-2xl border">
            <h2 className="text-xl font-semibold">{pages[page]?.title}</h2>
            <div className="mt-4">{pages[page]?.content}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex justify-between w-full px-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, pages.length - 1))}
          disabled={page === pages.length - 1}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default MonthlyReport;
