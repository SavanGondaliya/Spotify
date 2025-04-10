import React from "react";

export const AboutSection = ({aboutArtist}) => {
  
    return (
      <div className="__about_container__ text-white p-6 mt-6 rounded">
        <h2 className="__about_text__ text-xl font-bold">About</h2>
        <p>{aboutArtist}</p>

        <style>
          {
            `
            .__about_container__{
              background-color: #282870;
              box-shadow: #4949bf;
            }
            .__about_text__{
              color: #f2c178
            }
            `
          }
        </style>
      </div>
    );
  };
  
  /* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */