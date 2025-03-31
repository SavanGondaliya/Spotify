import lottie from "lottie-web";
import { useRef } from "react";
import { useEffect } from "react";


const LayerWave = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return; // Ensure the container exists

    const animation = lottie.loadAnimation({
      container: containerRef.current, 
      renderer: 'svg', 
      loop: true,      
      autoplay: true,  
      path: "/public/Animation/layer_1_wave.json"
    });

    animation.setSpeed(0.3); 

    return () => animation.destroy(); // Cleanup on unmount
  }, []);

  return <div ref={containerRef} id="lottie-container"></div>;
};

export default LayerWave;
