import lottie from "lottie-web";
import { useEffect } from "react";

const Wave = () => {
  useEffect(() => {
    fetch("/Animation/wave.json") 
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

  return (
      <div
        id="lottie"
        className="w-full h-full overflow-hidden"
      ></div>
  );

};

export default Wave;
