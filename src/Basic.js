import React, { Component } from "react";
import Dropzone from "react-dropzone";
import nope from "./nope.gif"
import gifshot from 'gifshot'

class Basic extends React.Component {
  constructor() {
    super();
    this.state = { 
      files: [],
      gifVideo:''
    };
  }

  // drop an .mp4 in
  onDrop(files) {
    this.setState({
      files
    });
    this.addGifToState(files)
  }


  addGifToState(files){
    this.convertToGif(files).then((image)=>{
        this.setState({
          gifVideo:image
        });
    });
  };
  // convert to a gif
  convertToGif(files){
    const file = files[0]
    return new Promise((resolve, reject) => {
    gifshot.createGIF({
      'video': [file],
      'completeCallback': function() {console.log('done')},
    },
    function(obj) {
      if(!obj.error) {
        resolve(obj.image);
      }
    });
  });
};
  // convert gif to frames
  convertGifToFrames(gifFile){}
  // check for min/max number of frames
  // downsample the number of frames, 8-15 frames per second
  // display the gif

  render() {
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
        </aside>
        <div>
          <h3>look, a gif</h3>
          <img src={this.state.gifVideo ? this.state.gifVideo : nope} alt="gif" />
        </div>
      </section>
    );
  }
}

export default Basic;
