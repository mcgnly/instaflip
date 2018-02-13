import React from "react";

export default ({ files, gifArray }) => (
  <div>
    <h2>Dropped files</h2>
    <ul>
      {files.map(f => (
        <li key={f.name}>
          {f.name} - {f.size} bytes
        </li>
      ))}
    </ul>
    <ul>
      {gifArray.map((f, index) => (
        <li key={index}>
          <img src={f.src} alt="img" />
        </li>
      ))}
    </ul>
  </div>
);
