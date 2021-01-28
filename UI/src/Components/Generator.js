import "./Generator.css";

import React from "react";
import axios from "axios";
class Generator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        }
    }

    uploadGrammar(e) {
        if (this.state.selectedFile) {
            const data = new FormData()
            data.append('file', this.state.selectedFile);
            const response = axios.post(
                "http://localhost:5000/generate",
                data
            )
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error))
        }
    }

    onChangeHandler = (e) => this.setState({ selectedFile: e.target.files[0] })

    render() {
        return (<div className="container">
            <h3>Upload your grammar file</h3>
            <div className="upload-zone">
                <input type="file" name="file" onChange={this.onChangeHandler} />
                <button onClick={this.uploadGrammar.bind(this)}>Upload</button>
            </div>
        </div>);
    }
}
export default Generator;