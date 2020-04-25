import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: "",
            bioDraft: "",
            inputAreaIsVisible: false,
            linkIsVisible: true
        };
        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        this.setState({
            inputAreaIsVisible: true,
            linkIsVisible: false
        });
    }

    formHasChanged(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    saveWasClicked(e) {
        e.preventDefault();
        this.setState({ inputAreaIsVisible: false });
        axios.post("/bio", this.state)
            .then( res => {
                this.props.setBio(res.data[0].bio);})
            .catch(err => {
                console.log("errZYX", err);
            });


    }

    render() {
        return (
            <React.Fragment>
                {this.props.bio}

                {this.props.bio && <p><a href="#" onClick={e => this.showModal(e)} style={{ textDecoration: 'none', color: 'white' }}>Edit your bio</a></p> || this.state.linkIsVisible && <a href="#" onClick={e => this.showModal(e)} style={{ textDecoration: 'none', color: 'white' }}>Add bio here if you feel like</a> }

                {this.state.inputAreaIsVisible && <div><textarea defaultValue={this.props.bio} onChange={e => this.formHasChanged(e)} name='bioDraft' cols="50" rows="3"></textarea><button onClick={e => this.saveWasClicked(e)}>Save</button></div> }
            </React.Fragment>
        );}
}
//&& )
