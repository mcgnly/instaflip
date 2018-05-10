import React, { Component } from "react";
import Pdf from "./pdfFactory.js";
import About from "./About.js";
import OrderForm from "./OrderForm.js";
import FileUploader from "./FileUploader.js";
import { convertCanvasToImage, convertToGif } from "./imageUtils.js";
import "./Basic.css";

class Basic extends Component {
  constructor() {
    super();
    this.state = {
      view: "main",
      files: [],
      gifVideo: "",
      loadingProgress: 0,
      madeBy: ""
    };
  }

  //arrow fn so I don't have to bind to 'this'
  updateName = evt => {
    // name for cover of flipbook
    this.setState({ madeBy: evt.target.value });
  };
  updateView = view => {
    // ghetto router
    this.setState({ view });
  };

  startPdf() {
    Pdf.instantiatePDF(this.state.madeBy);
  }

  // drop an .mp4 in, instantiate pdf singleton, add mp4 and gif to state
  onDrop(files) {
    this.startPdf();
    this.setState({
      files
    });
    this.addGifToState(files);
    console.log("files", files);
  }

  addGifToState(files) {
    //gets progress from converter out and sends to state here, where it can get turned into the svg progress bar
    const updateLoadingBar = loadingProgress => {
      console.log("loading", loadingProgress);
      this.setState({
        loadingProgress
      });
    };

    convertToGif(files, updateLoadingBar).then(obj => {
      // this returns an object which has the gif itself and the array of canvas-type frames

      // add the gif to the state to display it
      this.setState({
        gifVideo: obj.image
      });

      //now convert the canvases from the gif to images
      obj.savedRenderingContexts.map((item, index) => {
        //this returns an array of promises, because each conversion takes a while
        return convertCanvasToImage(item, index).then(image => {
          // adding a 'page' of the flipbook, 8 fit on an A4 sheet
          Pdf.addPageToPDF(image, index + 2); // +2 because index is 0 and plus a page for the title card
        });
      });
    });
  }

  render() {
    const widthOfProgressBar = 500 * this.state.loadingProgress;
    return (
      <div>
        {this.state.view === "about" && <About changePage={this.updateView} />}
        {this.state.view === "order" && (
          <OrderForm changePage={this.updateView} pdf={Pdf.convertToBlob()} />
        )}
        {this.state.view === "main" && (
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
                  <div className="loadingBar">
                    <svg height="10">
                      <rect
                        width={widthOfProgressBar * 7 / 10}
                        height="10"
                        fill="orange"
                        fillOpacity="0.5"
                        strokeOpacity="0.8"
                      />
                    </svg>
                    <h3>Converting...</h3>
                  </div>
                )}
              {this.state.gifVideo && (
                <div className="gifDisplay">
                  <img
                    className="gifElement"
                    src={this.state.gifVideo}
                    alt="gif"
                  />
                  <div className="centerColumn">
                    You can either download the PDF, and email it to yourself or
                    save to Drive or dropbox to print yourself, or order a
                    professionally printed and bound version for 20 euro.
                  </div>
                  <div className="pdfButton" onClick={Pdf.savePDF}>
                    Download PDF
                  </div>
                  <div
                    className="pdfButton centerColumn"
                    onClick={() => {
                      this.updateView("order");
                    }}
                  >
                    Order flipbook
                  </div>
                </div>
              )}
              <div
                className="pageChange"
                onClick={() => this.updateView("about")}
              />
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Basic;
