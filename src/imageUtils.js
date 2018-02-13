import gifshot from "gifshot";
import Pdf from "./pdfFactory.js";

// convert gif to frames
export const convertCanvasToImage = imagedata => {
  return new Promise((resolve, reject) => {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);
    var image = new Image();
    image.src = canvas.toDataURL();
    Pdf.addPageToPDF(image);
    resolve(image);
  });
};

export const getImageFromUrl = (url, callback) => {
  var img = new Image();
  img.crossOrigin = " ";
  img.onError = function() {
    alert('Cannot load image: "' + url + '"');
  };
  img.onload = function() {
    callback(img);
  };
  img.src = url;
};

// convert to a gif
export const convertToGif = files => {
  const file = files[0];
  return new Promise((resolve, reject) => {
    gifshot.createGIF(
      {
        video: [file],
        saveRenderingContexts: true,
        numFrames: 10,
        progressCallback: function(captureProgress) {
          console.log(captureProgress * 100, " % done");
          // TODO somehow need to bind to this
          // this.setState({
          //   loadingProgress: captureProgress * 100
          // });
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
