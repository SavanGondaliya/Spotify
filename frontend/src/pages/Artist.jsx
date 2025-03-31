import React from "react";
import { ArtistDetails } from "../components/User/Artists/Artist";
import { PopulerTracks } from "../components/User/Artists/PopulerTracks";
import { PlayerController } from "../components/User/Playler/Controller";
import { PopulerAlbum } from "../components/User/Artists/PopulerAlbum";
import { FeaturedAlbum } from "../components/User/Artists/Featured";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { RelatedArtist } from "../components/User/Artists/RelatedArtist";

export const Artist = () => {

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col w-full h-full">
        <div className="w-[100%] h-[88%]">
          <div className="flex w-full h-full">
            <div className="w-[15%] h-full">
              <VerticalNavbar />
            </div>
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-[100%] h-[12%]">
                <HorizontalNavbar />
              </div>
              <div className="flex w-full h-[100%] overflow-scroll">
                <div className="w-full h-full">
                  <ArtistDetails />
                </div>
                <div className="w-full flex flex-col gap-4">
                  <PopulerTracks className="w-full" />
                  <PopulerAlbum className="w-full" />
                  <RelatedArtist className="w-full" />
                  <FeaturedAlbum className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[12%]">
          <PlayerController />
        </div>
      </div>
    </div>
  );
};
