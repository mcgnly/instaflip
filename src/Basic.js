import React, { Component } from "react";
import Pdf from "./pdfFactory.js";
import FileUploader from "./FileUploader.js";
import FileDisplay from "./FileDisplay.js";
import {
  convertCanvasToImage,
  getImageFromUrl,
  convertToGif
} from "./imageUtils.js";
import './Basic.css';

class Basic extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      gifVideo: "",
      gifArray: [],
      loadingProgress: 0
    };
  }

  componentDidMount() {
    Pdf.instantiatePDF();
  }

  // drop an .mp4 in
  onDrop(files) {
    this.setState({
      files
    });
    this.addGifToState(files);
  }

  addGifToState(files) {
    convertToGif(files).then(obj => {
      //add the gif to the state to display it
      this.setState({
        gifVideo: obj.image,
        // loadingProgress
      });

      //now convert the canvases from the gif to images
      const promises = obj.savedRenderingContexts.map(item => {
        //this returns an array of promises
        return convertCanvasToImage(item).then(x => {
          return x;
        });
      });
      //when all the promises come back, add the array of individual images to state
      Promise.all(promises)
        .then(function(results) {
          return results;
        })
        .then(imageArray => {
          getImageFromUrl(imageArray[0].src, Pdf.addPageToPDF);
          this.setState({
            gifArray: imageArray
          });
        });
    });
  }

  render() {
    return (
      <section>
        {!this.state.gifVideo && (
          <div>
            <FileUploader onDrop={this.onDrop.bind(this)} />
            <aside>
              <div className="ldBar" data-value={this.state.loadingProgress} />
            </aside>
          </div>
        )}
        {this.state.gifVideo && (
          <div className='gifDisplay'>
            <img className='gifElement' src={this.state.gifVideo} alt="gif" />
            <h3 className='gifTitle'>Here's what your flipbook will look like!</h3>
            <button className='pdfDownload' onClick={Pdf.savePDF}>Download the PDF to print from home</button>
            <button className='sendToPrinter' onClick={()=>console.log('email to me')}>Send the book to the printers</button>
          </div>
        )}
      </section>
    );
  }
}
            // <FileDisplay
              // files={this.state.files}
              // gifArray={this.state.gifArray}
            // />

export default Basic;
