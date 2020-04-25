import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(){
        super();
        this.state = {
            file : ""
        };

    }

    formHasChanged(e) {
        this.file = e.target.files[0];
    }


    buttonWasClicked(f) {
        f.preventDefault();
        var formData = new FormData();
        formData.append("file", this.file);
        axios.post("/uploadpropic", formData)
            .then(res => {
                this.props.profileChanged(res.data[0].prourl);
            }).catch(err => {
                console.log("err", err);
            });
    }

    render(){
        return (
            <div>
                <input onChange={e => this.formHasChanged(e)} name='file' type='file' accept='image/*' />
                <button className="microbutton" onClick={e => this.buttonWasClicked(e)}>Submit</button>
            </div>
        );
    }
}
