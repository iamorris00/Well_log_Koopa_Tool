import Topbar from "./Topbar/Topbar";
import LoadLogFile from "./LoadLogFile/LoadLogFile";
import {useState} from "react";
import {lasFileCurvesProcess, processLasData} from "./utils";
import * as d3 from "d3";
import DepthTrack from "./DepthTrack/DepthTrack";

function App() {
    const[file, setFile] = useState(null)
    const[activePlotOption, setActivePlotOption] = useState(false)
    const[activeOtherButton, setActiveOtherButton] = useState(false)
    const[data, setData] = useState([])

    const singleFileChange = (e) =>{
        setFile(e.target.files[0])
        setActivePlotOption(true)
    }

    const uploadFile = async () =>{
        console.log(new Date() + ". Begins ->Reading raw data ...");
        const text = await file.text()

        let curvesName = lasFileCurvesProcess(text)
        let lasDataText = processLasData(text)

        setActiveOtherButton(true)
        console.log(d3.csvParse(lasDataText))
        setData(d3.csvParse(lasDataText))
        console.log(curvesName)
    }

  return (
    <div className="app">
      <Topbar active={activeOtherButton}/>
      <LoadLogFile active={activePlotOption} file={file} singleFileChange={singleFileChange}
      uploadFile={uploadFile}/>
        <div className="logs">
            <DepthTrack dataset={data}/>
        </div>
    </div>
  );
}

export default App;
