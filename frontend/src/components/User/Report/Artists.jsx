const TopArtists = ({ artists, reportData }) => {
  console.log(artists,reportData);
  
    return (
      <div className="h-100">
        <h2 className="text-xl font-bold">Your Top 5 Artists</h2>
        <div className="grid grid-cols-1 gap-3">
          {artists.length > 0 ? (
            artists.map((artist, index) => (
              <div key={index} className="flex items-center space-x-3 border-b pb-2">
                {artist?.images?.[0]?.url && (
                  <img
                    className="w-12 h-12 rounded"
                    src={artist?.images[0].url}
                    alt={artist?.name}
                  />
                )}
                <p className="text-lg">
                  {index + 1}. {artist?.name} ({reportData[0]?.topArtists?.[index]?.[1] || 0} plays)
                </p>
              </div>
            ))
          ) : (
            <p>No artist data available.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default TopArtists;
  