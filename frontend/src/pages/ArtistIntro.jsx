import { useEffect } from "react";
import noizeeLogo from "/public/Noizee For Artists.svg"

const NoizeeForArtists = () => {
  useEffect(() => {
    const createMusicNotes = () => {
      const symbols = ['\u266A', '\u266B', '\u266C', '\u266D'];
      for (let i = 0; i < 10; i++) {
        let note = document.createElement("div");
        note.className = "music-note";
        note.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        note.style.left = Math.random() * 100 + "vw";
        note.style.animationDuration = Math.random() * 5 + 3 + "s";
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 8000);
      }
    };

    const interval = setInterval(createMusicNotes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="background"></div>
      <header>
        <div className="logo">
          <img src={noizeeLogo} alt="Noizee Logo" />
        </div>
        <nav>
          <button className="btn">Login</button>
          <button className="btn">Register</button>
        </nav>
      </header>
      <main>
        <div className="left-text">
          <h1>TURN VIBES <br /> INTO VIRAL</h1>
          <p>
            <span className="blue">Drop your sound.</span>{" "}
            <span className="gold">Build your brand.</span>
            <br />Own the spotlight.
          </p>
        </div>
        <div className="right-text">
          <img src={noizeeLogo} alt="Noizee Logo" />
        </div>
      </main>
      <style jsx>{`
        * {
          font-family: teko;
        }
        .container{
            width:100vw;
            height:100vh;
        }
        body {
          margin: 0;
          padding: 0;
          background: #05040c;
          color: white;
          overflow: hidden;
        }
        .background {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .music-note {
          position: absolute;
          font-size: 12px;
          color: #ffcc00;
          opacity: 0.6;
          animation: floatUp 5s linear infinite;
        }
        @keyframes floatUp {
          from {
            transform: translateY(100vh);
            opacity: 0;
          }
          to {
            transform: translateY(-100vh);
            opacity: 1;
          }
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
        }
        .logo img {
          width: 5em;
          margin : 0px 50px;
          margin-bottom: 20px;
        }
        nav {
          display: flex;
          gap: 20px;
          margin-right: 25px;
        }
        .btn {
          background: #ffba53;
          border: none;
          box-shadow: 2px 2px 0px 1px #935d07;
          padding: 8px 30px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
        }
        .btn:hover {
          background-color: #ffd99f;
        }
        main {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-left: 10vw;
          gap: 70px;
        }
        .right-text img {
          width: 20em;
          animation: logoPulse 2s infinite step-start;
        }
        @keyframes logoPulse {
          0% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.1) rotate(5deg); opacity: 0.9; }
          100% { transform: scale(1) rotate(-5deg); opacity: 1; }
        }
        h1 {
          text-align: center;
          font-size: 6rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #dcdcff;
          text-shadow: 3px 3px 0px #4949bf;
          animation: extremeGlitch 1.2s infinite alternate, shake 0.5s infinite;
        }
        @keyframes extremeGlitch {
          0% { text-shadow: 3px 3px 0px #4949bf, -3px -3px 0px #935d07; }
          50% { text-shadow: 5px -5px 0px #4949bf, -5px 5px 0px #935d07; }
          100% { text-shadow: 2px 2px 0px #4949bf, -2px -2px 0px #935d07; }
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 2px); }
          75% { transform: translate(1px, -1px); }
        }
        p {
          font-size: 1.7rem;
          text-align: center;
          text-shadow: 2px 2px 0px #4949bf;
          font-weight: 600;
        }
        .blue {
          text-shadow: 2px 2px 0px #282870;
          color: #4949bf;
          font-weight: bold;
        }
        .gold {
          color: #ffba53;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default NoizeeForArtists;
