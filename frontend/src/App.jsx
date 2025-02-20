import './index.css';
import Auth from "./pages/Register.jsx";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { WebPlaybackProvider } from './components/utility/WebPlayBackSDK.jsx';
import Home from './pages/Home.jsx';
import { RecenltyPlayed } from './components/Playler/RecentlyPlayed.jsx';
import { Tracks } from "./components/Artists/Tracks.jsx";
import { Album } from './components/Album/Album.jsx';
import { Artist } from './pages/Artist.jsx';


function App(){

  return (
    <div>
      <BrowserRouter>
        <WebPlaybackProvider>
          <Routes path="/">
              <Route path="auth/user" element={<Auth />} />
              <Route path="/" element={<Home />} />
              <Route path="/recent" element={<RecenltyPlayed />} />
              <Route path="/tracks" element={<Tracks />} />
              <Route path="/album" element={<Album />} />
              <Route path="/artist/:id" element={<Artist />} />
          </Routes>
        </WebPlaybackProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
