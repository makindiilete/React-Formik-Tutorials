import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import { YoutubeForm } from "./component/YoutubeForm";
import { ManualValidationTrigger } from "./component/ManualValidationTrigger";

function App() {
  return (
    <div className="App py-5">
      <ManualValidationTrigger />
    </div>
  );
}

export default App;
