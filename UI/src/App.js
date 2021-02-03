import React, { useState } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";

import { GrammarMenu } from "./Components/GrammarMenu";

const App = () => {
  const initialGrammar = "Your Grammar";
  const [grammar, setGrammar] = useState(initialGrammar);
  const [visitor, setVisitor] = useState("Visitor Code");

  return (
    <div className="split-screen">
      <div className="left-pane">
        <div className="editor">
          <Editor
            height="95vh"
            defaultValue={initialGrammar}
            onChange={setGrammar}
          ></Editor>
        </div>
        <div>
          <GrammarMenu
            grammar={grammar}
            onChangeVisitor={setVisitor}
          ></GrammarMenu>
        </div>
      </div>
      <div className="right-pane">
        <div className="editor">
          <Editor
            height="98vh"
            defaultLanguage="typescript"
            onChange={setVisitor}
            value={visitor}
          ></Editor>
        </div>
      </div>
    </div>
  );
};

export default App;
