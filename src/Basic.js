import React, { Component } from "react";
import Dropzone from "react-dropzone";
import nope from "./nope.gif"
import gifshot from 'gifshot'
import Pdf from './pdfFactory.js'

class Basic extends React.Component {
  constructor() {
    super();
    this.state = { 
      files: [],
      gifVideo:'',
      gifArray:[],
    };
  }

  componentDidMount(){
    Pdf.instantiatePDF();
  }

  // drop an .mp4 in
  onDrop(files) {
    this.setState({
      files
    });
    this.addGifToState(files)
  }


  addGifToState(files){
    this.convertToGif(files).then((obj)=>{
      //add the gif to the state to display it 
      this.setState({
        gifVideo:obj.image
      });

      //now convert the canvases from the gif to images
      const promises = obj.savedRenderingContexts.map((item)=>{
        //this returns an array of promises
        return this.convertCanvasToImage(item).then((x)=>{
          return x
        });
      });
      //when all the promises come back, add the array of individual images to state
      Promise.all(promises).then(function(results) {
        console.log('in promise.all', results)
        return results;
      }).then((imageArray)=>{
        this.getImageFromUrl(imageArray[0].src, Pdf.addPageToPDF);
        this.setState({
          gifArray:imageArray
        });
      });
    });
  };

  // convert to a gif
  convertToGif(files){
    const file = files[0]
    console.log(file);
    return new Promise((resolve, reject) => {
    gifshot.createGIF({
      video: [file],
      saveRenderingContexts: true,
      numFrames: 10,
      progressCallback: function (captureProgress) {
        console.log(captureProgress*100, ' % done')
      }
    },
    function(obj) {
      if(!obj.error) {
        console.log(obj.savedRenderingContexts)
        resolve(obj);
      }
    });
  });
};

// convert gif to frames
convertCanvasToImage(imagedata) {
  return new Promise((resolve, reject) => {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);
    var image = new Image();
    image.src = canvas.toDataURL();
    Pdf.addPageToPDF(image);
    resolve(image)
  });
}

//convert the array of images to a pdf
// convertToPdf(){
//   // Default export is a4 paper, portrait, using milimeters for units
//   var doc = new jsPDF({
//     orientation: 'landscape',
//     unit: 'in',
//     format: [4, 2]
//   })

//   doc.text('Hello world!', 1, 1)
// }

  getImageFromUrl(url, callback) {
      var img = new Image();
      img.crossOrigin = " ";
      img.onError = function() {
          alert('Cannot load image: "'+url+'"');
      };
      img.onload = function() {
          callback(img);
      };
      img.src = url;
  }

  // createPDF(imgData) {
  //     var doc = new jsPDF({
  //       orientation: 'landscape',
  //       format: [60, 90]
  //     });
  //     // doc.addPage();
  //     doc.addImage(imgData, 'JPEG', 30, 10, 80, 50, 'monkey');
  //     doc.save('two-by-four.pdf')
  // }

  render() {
    console.log(this.state.gifArray);
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
          <ul>
            {this.state.gifArray.map(f => (
              <li >
                <img src={f.src} alt="img" />
              </li>
            ))}
          </ul>
        </aside>
        <div>
          <h3>look, a gif</h3>
          <img src={this.state.gifVideo} alt="gif" />
          <button onClick={Pdf.savePDF()}>Download the PDF</button>
        </div>
      </section>
    );
  }
}

export default Basic;
