import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const Wave = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/Animation/wave.json", // Directly use path
      });
    }
  }, []);

  return <div ref={containerRef} className="w-full h-full pointer-events-none"></div>;
};

export default Wave;
