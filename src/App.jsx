import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./pages/List";
import FileUploader from "./pages/FileUploader";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <h1>IIUM Databases</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List input={inputText} />
      <FileUploader/>

    </div>
  );
}

export default App;
