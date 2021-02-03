import "./GrammarMenu.css";

import React, { useState } from "react";

import { uploadGrammar, uploadGrammarFromFile } from "../requests";

export const GrammarMenu = (props) => {
  const [selectedFile, setSelectedFile] = useState();

  const uploadGrammarOnClickHandler = () => {
    uploadGrammar(props.grammar).then(props.onChangeVisitor).catch(console.log);
  };

  const uploadGrammarFromFileOnClickHandler = () => {
    uploadGrammarFromFile(selectedFile)
      .catch(props.onChangeVisitor)
      .catch(console.log);
  };

  return (
    <div className="grammar-menu">
      <button>Export Project</button>
      <div className="divider"></div>
      <input
        type="file"
        name="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      ></input>
      <div className="divider"></div>
      <button onClick={uploadGrammarFromFileOnClickHandler}>
        Compile Grammar from File
      </button>
      <div className="divider"></div>
      <button onClick={uploadGrammarOnClickHandler}>Compile Grammar</button>
    </div>
  );
};
