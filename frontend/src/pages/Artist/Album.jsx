import React from "react";
import { ArtistAlbums } from "../../components/Artist/components/Albums";

const ArtistAlbums = () => {
    return (
        <div className="flex h-full min-h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="w-2/5 text-white">
            <Sidebar />
          </div>
    
          {/* Main Content */}
          <div className="flex flex-col w-4/5 p-6 space-y-6 overflow-y-auto min-h-0">
            <ArtistAlbums />
          </div>
        </div>
      );
}

export default ArtistAlbums;