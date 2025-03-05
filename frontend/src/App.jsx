import './index.css';
import Auth from "./pages/Register.jsx";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { WebPlaybackProvider } from './components/utility/WebPlayBackSDK.jsx';
import Home from './pages/Home.jsx';
import { RecenltyPlayed } from './components/Playler/RecentlyPlayed.jsx';
import { Artist } from './pages/Artist.jsx';
import { Album } from './pages/Album.jsx';
import { PlaylistPage } from './pages/Playlist.jsx';
import VerifyEmail from './pages/EmailVerified.jsx';
import { LyricsPage } from './pages/Lyrics.jsx';
import { Search } from './pages/Search.jsx';

function App(){

  sessionStorage.setItem("session_details",'{"user_id":"m7vv2gzotf4cntkx"}');

  return (
    <div>
      <BrowserRouter>
        <WebPlaybackProvider>
          <Routes path="/">
              <Route path="auth/user" element={<Auth />} />
              <Route path="/" element={<Home />} />
              <Route path="/recent" element={<RecenltyPlayed />} />
              <Route path="/album" element={<Album />} />
                <Route path="/artist/:id" element={<Artist />} />
              <Route path="/album/:id" element={<Album />} />
              <Route path="/playlist/:playlist_id" element={<PlaylistPage />} />
              <Route path="/verification" element={<VerifyEmail />} />
              <Route path="/lyrics" element={<LyricsPage />} />
              <Route path="/search/:q" element={<Search />} />
              <Route path="/search/" element={<Search />} />
          </Routes>
        </WebPlaybackProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
