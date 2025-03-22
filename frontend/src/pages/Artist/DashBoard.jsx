import React from "react";

import { AboutSection } from "../../components/Artist/components/About";
import { TopTracks } from "../../components/Artist/components/TopTracks";
import { ArtistAlbumPage } from "../../components/Artist/components/ArtistAlbum";
import Sidebar from "../../components/Artist/components/Sidebar";
import ArtistProfile from "../../components/Artist/components/Profile";

const ArtistDashboardPage = () => {
    return (
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-1/5  text-white">
            <Sidebar />
          </div>
      
          {/* Main Content */}
          <div className="flex flex-col w-4/5 p-6 space-y-6 overflow-y-auto">
            <ArtistProfile />
            <TopTracks />
            <ArtistAlbumPage/>
            <AboutSection />
          </div>
        </div>
      );      
}

export default ArtistDashboardPage;