import './index.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Auth from "./pages/Register.jsx";
import { WebPlaybackProvider } from './components/User/utility/WebPlayBackSDK.jsx';
import Home from './pages/Home.jsx';
import { Artist } from './pages/Artist.jsx';
import { Album } from './pages/Album.jsx';
import { PlaylistPage } from './pages/Playlist.jsx';
import VerifyEmail from './pages/EmailVerified.jsx';
import { LyricsPage } from './pages/Lyrics.jsx';
import { Search } from './pages/Search.jsx';
import { LikedSongs } from './pages/Favourite.jsx';
import { UserPlaylist } from './pages/UserPlaylists.jsx';
import { Tracks } from './pages/Music.jsx';
import { Profile } from './pages/Profile.jsx';

import AdminDashboard from '../src/components/Admin/admin/admindashboard.jsx'
import MusicDashboard from "../src/components/Admin/admin/music/musicDashboard.jsx";
import UsersDashboard from "../src/components/Admin/admin/user/userDashboard.jsx";
import ArtistsDashboard from "../src/components/Admin/admin/artist/artistdashboard.jsx";
import EditArtist from "../src/components/Admin/admin/artist/editArtist.jsx";
import EditUser from "../src/components/Admin/admin/user/editUser.jsx";
import EditMusic from "../src/components/Admin/admin/music/editMusic.jsx";

import { CreateAlbum } from './components/Artist/components/CreateAlbum.jsx';
import { AddTrack } from './components/Artist/components/AddTrack.jsx';
import { UpdateTrack } from './components/Artist/components/UpdateTrack.jsx';
import { ArtistTracks } from './components/Artist/components/ArtistTracks.jsx';
import { ArtistAlbums } from './components/Artist/components/Albums.jsx';
import { UpdateAlbum } from './components/Artist/components/UpdateAlbum.jsx';
import NoizeeForArtists from './pages/ArtistIntro.jsx';
import ArtistRegister from './components/Artist/components/ArtistRegister.jsx';
import AlbumTracks from './components/Artist/components/AlbumTracks.jsx';
import ArtistDashboardPage from './pages/Artist/DashBoard.jsx';
import { CreatePlaylist } from './components/User/Playlist/CreatePlaylist.jsx';


function App(){

  sessionStorage.setItem("secret_key",JSON.stringify({"user_id":"cahg3c7ncck314zq"}))

  return (
      <div>
        <BrowserRouter>
          <WebPlaybackProvider>
            <Routes path="/">

                {/* User Routes */}
                <Route path="auth/user" element={<Auth />} />
                <Route path="/" element={<Home />} />
                <Route path="/album" element={<Album />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/playlist/:playlist_id" element={<PlaylistPage />} />
                <Route path="/verification" element={<VerifyEmail />} />
                <Route path="/lyrics" element={<LyricsPage />} />
                <Route path="/search/:q" element={<Search />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favourite" element={<LikedSongs />} />
                <Route path="/:id/playlists" element={<UserPlaylist />} />
                <Route path="/music" element={<Tracks />} />
                <Route path="/user/:id" element={<Profile />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/artist" element={<ArtistsDashboard />} />
                <Route path="/admin/music" element={<MusicDashboard />} />
                <Route path="/admin/user" element={<UsersDashboard />} />
                <Route path="/admin/music/edit/:id" element={<EditMusic />} />
                <Route path="/admin/user/edit/:id" element={<EditUser />} />
                <Route path="/admin/artist/edit/:id" element={<EditArtist />} />

                {/* Artist Routes*/}              
                <Route path="/album/create" element={<CreateAlbum />} />
                <Route path="/track/add" element={<AddTrack />} />
                <Route path="/track/update/:id" element={<UpdateTrack />} />
                <Route path="/:id/tracks" element={<ArtistTracks />} />
                <Route path="/:id/albums" element={<ArtistAlbums />} />
                <Route path="/album/update/:id" element={<UpdateAlbum />} />
                <Route path="/artist/intro" element={<NoizeeForArtists />} />
                <Route path="/artist/dashboard" element={<ArtistDashboardPage />} />
                <Route path="/artist/register" element={<ArtistRegister />} />
                <Route path="/albums/:id" element={<AlbumTracks />} />
            </Routes>
          </WebPlaybackProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;
