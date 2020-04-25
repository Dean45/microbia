import React from "react";
import axios from "./axios";

import Navigation from "./navigation";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route } from 'react-router-dom';
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";
import Friends from "./friends";
import {Chat} from "./chat";


export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            id : "",
            first: "",
            last: "",
            prourl: "",
            bio: "",
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
        this.profileChanged = this.profileChanged.bind(this);
        this.setBio = this.setBio.bind(this);
    }


    componentDidMount() {
        axios.get("/user")
            .then(res => {
                this.setState({
                    id : res.data[0].id,
                    first : res.data[0].first,
                    last : res.data[0].last,
                    bio: res.data[0].bio,
                    prourl : res.data[0].prourl});
            }).catch(err => {
                console.log("errA", err);
            });
    }


    showModal() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    profileChanged(props) {
        this.setState({
            prourl : props,
            uploaderIsVisible: false
        });
    }

    setBio(props) {
        console.log("runnin");
        this.setState({
            bio: props
        });
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Route path="/"
                        render={() => (
                            <React.Fragment>
                                <Navigation
                                    first={this.state.first}
                                    last={this.state.last}
                                    prourl={this.state.prourl}
                                    showModal={this.showModal}
                                />

                            </React.Fragment>
                        )}
                    />
                    <div className="content">

                        <Route exact path="/"
                            render={() => (
                                <React.Fragment>
                                    <Profile
                                        first={this.state.first}
                                        last={this.state.last}
                                        prourl={this.state.prourl}
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                        showModal={this.showModal}
                                    />

                                    {this.state.uploaderIsVisible && <Uploader profileChanged={this.profileChanged} />}

                                </React.Fragment>
                            )}
                        />

                        <Route path="/user/:id"
                            render={props => (
                                <React.Fragment>
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        id={this.state.id}
                                    />

                                </React.Fragment>
                            )}
                        />

                        <Route exact path="/chatbox"
                            render={() => (
                                <React.Fragment>
                                    <Chat
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        prourl={this.state.prourl}
                                    />
                                </React.Fragment>
                            )}
                        />

                        <Route path="/users"
                            render={() => (
                                <FindPeople
                                />
                            )}
                        />

                        <Route path="/friends"
                            render={() => (
                                <Friends
                                />
                            )}
                        />

                    </div>
                </React.Fragment>
            </BrowserRouter>

        );}

}
