import lottie from "lottie-web";
import { useEffect } from "react";

const Yellowave = () => {
  useEffect(() => {
    fetch("/Animation/yellow_wave.json") 
      .then((response) => response.json())
      .then((data) => {
        lottie.loadAnimation({
          container: document.getElementById("lottie"),
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: data, 
        });
      }).catch((error) => console.log(error)
      );
  }, []);

  return (<div id="lottie" className="w-full h-full absolute "></div>)
       
};

export default Yellowave;
