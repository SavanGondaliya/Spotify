import { useState, useEffect } from "react";
import MusicLoader from "./Loader";
import axios from "axios";

import ReportIntro from "../Report/Intro";
import TopArtists from "../Report/Artists";
import TopSongs from "../Report/Toptracks";
import StreamingTime from "../Report/Streaming";

const MonthlyReport = ({id}) => {
  const session_details = sessionStorage.getItem("session_details");
  const [page, setPage] = useState(0);
  const [artist, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [reportData, setReportData] = useState(null);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/report?session_details=${session_details}&report_id=${id}`)
      .then((res) => {
        if (res.status === 200) {
          setReportData(res.data);
        }
      })
      .catch((error) => console.error("Error fetching report data:", error));
  }, [id]);

  useEffect(() => {
    if (!reportData) return;

    const artistIds = new Set();
    const songIds = new Set();

    reportData[0]?.topArtists?.forEach(([id]) => artistIds.add(id));
    reportData[0]?.topSongs?.forEach(([id]) => songIds.add(id));
      console.log(artistIds,songIds);
    
    if (artistIds.size > 0) {
      axios
        .get(`http://localhost:5000/artists?ids=${Array.from(artistIds).join(",")}&session_details=${session_details}`)
        .then((res) => setArtists(res?.data?.artists))
        .catch((error) => console.error("Error fetching artists:", error));
    }

    if (songIds.size > 0) {
      axios
        .get(`http://localhost:5000/tracks?ids=${Array.from(songIds).join(",")}&session_details=${session_details}`)
        .then((res) => setSongs(res?.data?.tracks))
        .catch((error) => console.error("Error fetching songs:", error));
    }
  }, [reportData]);

  if (!reportData) {
    return <div className="text-center text-gray-500"><MusicLoader /></div>;
  }
  console.log(artist,songs);
  
  const pages = [
    <ReportIntro />,
    <StreamingTime reportData={reportData} />,
    <TopArtists artists={artist} reportData={reportData} />,
    <TopSongs songs={songs} reportData={reportData} />
  ];
  
  return (
    <div className="w-[25%]  h-full mx-auto flex flex-col items-center p-6 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white rounded-lg shadow-lg">
      <div className="w-full flex justify-between mt-6">
        <button 
          onClick={() => setPage((prev) => prev - 1)}
          className="px-5 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === 0}
        >
          Prev
        </button>
  
        <button 
          onClick={() => setPage((prev) => prev + 1)}
          className="px-5 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === pages.length - 1}
        >
          Next
        </button>
      </div>
  
      <div className="mt-8 w-full">
        <div className="flex justify-center items-center w-[120]">
          {pages[page]}
        </div>
      </div>
    </div>
  );  
};

export default MonthlyReport;
