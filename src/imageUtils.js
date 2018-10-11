import gifshot from "gifshot";

// convert single canvas-type frame to image-type
export const convertCanvasToImage = (imagedata, index) => {
  // this takes a while, so make it a promise
  return new Promise((resolve, reject) => {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);
    var image = new Image();
    image.src = canvas.toDataURL();
    resolve(image);
  });
};

// convert to a gif
export const convertToGif = (files, updateLoadingBar) => {
  const file = files[0];

  // this takes a while to process, so do in a promise to know when it's done
  return new Promise((resolve, reject) => {
    gifshot.createGIF(
      {
        video: [file],
        // the renderingContexts are the individual frames as canvas image binary data
        saveRenderingContexts: true,
        //standard 10 frames per second, number of frames caps it
        numFrames: 50,
        // captureProgress is the 0-1 amount done it is working through the video
        progressCallback: function(captureProgress) {
          updateLoadingBar(captureProgress);
        }
      },
      // this is the callback fn for gifshot, in our case it gets the array of canvas-type frames and resolves the promise with them
      function(obj) {
        if (!obj.error) {
          resolve(obj);
        }
      }
    );
  });
};
