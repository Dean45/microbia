import React from "react";
import axios from "./axios";
import Frend from "./frend";

export default class OtherProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id : "",
            first : "",
            last : "",
            bio : "",
            prourl : "",

        };
    }

    componentDidMount() {
        axios.get('/api/user/' + this.props.match.params.id)
            .then(  res => {
                this.setState({
                    first : res.data[0].first,
                    last : res.data[0].last,
                    bio: res.data[0].bio,
                    prourl : res.data[0].prourl});
            }).catch(err => {
                this.props.history.push('/');
                console.log("errX", err);
            });
    }

    render(){
        let pimg = this.state.prourl || "https://picsum.photos/200";
        return (
            <div>
                <h4> {this.state.first} {this.state.last} </h4>
                <img src={pimg} alt={this.state.first + " " + this.state.last} className="profLarg"/>
                <p> {this.state.bio} </p>
                <Frend
                    oid={this.props.match.params.id}
                    mid={this.props.id}
                />
            </div>
        );
    }
}
