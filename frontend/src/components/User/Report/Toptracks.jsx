const TopSongs = ({ songs, reportData }) => {
    return (
      <div className="h-100">
        <h2 className="text-xl font-bold">Your Top 5 Songs</h2>
        <div className="grid grid-cols-1 gap-3">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <div key={index} className="flex items-center space-x-3 border-b pb-2">
                {song?.album?.images?.[0]?.url && (
                  <img
                    className="w-12 h-12 rounded"
                    src={song?.album?.images[0].url}
                    alt={song?.name}
                  />
                )}
                <p className="text-lg">
                  {index + 1}. {song?.name} ({reportData[0]?.topSongs?.[index]?.[1] || 0} plays)
                </p>
              </div>
            ))
          ) : (
            <p>No song data available.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default TopSongs;
  