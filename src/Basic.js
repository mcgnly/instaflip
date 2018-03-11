import React, { Component } from "react";
import Pdf from "./pdfFactory.js";
import FileUploader from "./FileUploader.js";
import FileDisplay from "./FileDisplay.js";
import {
  convertCanvasToImage,
  getImageFromUrl,
  convertToGif
} from "./imageUtils.js";
import Circle from "react-progressbar";
import "./Basic.css";
import "./loading-bar.css";

class Basic extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      gifVideo: "",
      // gifArray: [],
      loadingProgress: 0,
      madeBy: "",
      emailTo: ""
    };
  }

  updateName = evt => {
    //arrow fn so I don't have to bind to this
    this.setState({ madeBy: evt.target.value });
  };
  updateEmail = evt => {
    //arrow fn so I don't have to bind to this
    this.setState({ emailTo: evt.target.value });
  };

  startPdf() {
    Pdf.instantiatePDF(this.state.madeBy);
  }

  // drop an .mp4 in
  onDrop(files) {
    this.startPdf();
    this.setState({
      files
    });
    this.addGifToState(files);
  }

  addGifToState(files) {
    const progressCallback = loadingProgress => {
      this.setState({
        loadingProgress
      });
    };
    convertToGif(files, progressCallback).then(obj => {
      //add the gif to the state to display it
      this.setState({
        gifVideo: obj.image
      });

      //now convert the canvases from the gif to images
      const promises = obj.savedRenderingContexts.map((item, index) => {
        //this returns an array of promises
        return convertCanvasToImage(item, index).then(x => {
          return x;
        });
      });
      // //when all the promises come back, add the array of individual images to state
      // Promise.all(promises).then(function(results) {
      //   return results;
      // });
    });
  }

  render() {
    const widthOfProgressBar = 500 * this.state.loadingProgress;
    return (
      <div>
        {!this.state.gifVideo ? (
          <h3 className="description">
            Convert your instagram story into a flipbook. In case that's
            something you've always wanted to do.
          </h3>
        ) : (
          <h3 className="gifTitle">
            Here's what your flipbook will look like!
          </h3>
        )}
        <section>
          {!this.state.gifVideo &&
            !this.state.loadingProgress > 0 && (
              <div>
                Made By:
                <input
                  type="text"
                  className="nameInput"
                  onChange={this.updateName}
                />
                <FileUploader onDrop={this.onDrop.bind(this)} />
              </div>
            )}
          {this.state.loadingProgress > 0 &&
            !this.state.gifVideo && (
              <div>
                <svg height="10">
                  <rect
                    width={widthOfProgressBar}
                    height="10"
                    fill="purple"
                    fillOpacity="0.5"
                    strokeOpacity="0.8"
                  />
                </svg>
                <h3>Converting...</h3>
              </div>
            )}
          {this.state.gifVideo && (
            <div className="gifDisplay">
              <img className="gifElement" src={this.state.gifVideo} alt="gif" />
              <div className="centerColumn">
                Email finished PDF to:
                <input
                  type="text"
                  className="nameInput"
                  onChange={this.updateEmail}
                />
              </div>
              <div className="pdfButton" onClick={Pdf.savePDF}>
                Get PDF
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

// <div
// className="printButton"
// onClick={() => console.log("email to me")}
// >
// Send the book to the printers
// </div>
export default Basic;
