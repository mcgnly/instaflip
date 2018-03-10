import gifshot from "gifshot";
import Pdf from "./pdfFactory.js";

// convert gif to frames
export const convertCanvasToImage = (imagedata, index) => {
  return new Promise((resolve, reject) => {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);
    var image = new Image();
    image.src = canvas.toDataURL();
    Pdf.addPageToPDF(image, index + 2); // +2 because index is 0 and plus a page for the title card
    resolve(image);
  });
};

// convert to a gif
export const convertToGif = (files, progressCallback) => {
  const file = files[0];
  return new Promise((resolve, reject) => {
    gifshot.createGIF(
      {
        video: [file],
        saveRenderingContexts: true,
        //standard 10 frames per second, number of frames caps it
        numFrames: 10,
        progressCallback: function(captureProgress) {
          progressCallback(captureProgress);
          console.log(captureProgress * 100, " % done");
        }
      },
      function(obj) {
        if (!obj.error) {
          console.log(obj.savedRenderingContexts);
          resolve(obj);
        }
      }
    );
  });
};
