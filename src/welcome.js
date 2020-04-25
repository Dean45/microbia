import React from 'react';
import axios from "./axios";
import { HashRouter, Route, Link } from 'react-router-dom';

export default function Welcome() {
    return (
        <div>
            <div className="micro">Microbia</div>
            <div className="social">Social network for single cell organisms*</div>
            <div className="socialb">Social network for single cell organisms*</div>
            <div className="socialc">*No Coronas Allowed</div>
            <video autoPlay loop muted><source src="final.mp4" type="video/mp4"></source></video>
            <HashRouter>
                <div className="register-box">

                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />

                </div>
            </HashRouter>
        </div>
    );
}


class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error : false };
    }

    formHasChanged(e) {
        this.setState({
            [e.target.name] : e.target.value
        }, () => console.log(this.state));
    }


    buttonWasClicked(f) {
        f.preventDefault();
        axios.post("/welcome", this.state)
            .then(res => { if (res.data === true) {
                location.replace("/welcome#/login");
            } else {
                this.setState({ error: true});
            }}).catch(err => {
                this.setState({ error: true});
                console.log("err1", err);
            });
    }

    render() {
        return (
            <div>
                <form>
                    <input name="first" type="text" placeholder="First" onChange={e => this.formHasChanged(e)} />
                    <input name="last" type="text" placeholder="Last" onChange={e => this.formHasChanged(e)} />
                    <input name="email" type="email" placeholder="Email" onChange={e => this.formHasChanged(e)} />
                    <input name="password" type="password" placeholder="Password" onChange={e => this.formHasChanged(e)} />
                    <button className="microbutton" onClick={e => this.buttonWasClicked(e)}>Submit</button>
                </form>
                {this.state.error && <div className="welcome-text">Something went wrong, please try again</div>}
                <div className="welcome-text"> Already a Member? <Link to='/login' id="awel">Log in here</Link> </div>

            </div>
        );
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error : false };
    }

    formHasChanged(e) {
        this.setState({
            [e.target.name] : e.target.value
        }, () => console.log(this.state));
    }

    buttonWasClicked(f) {
        f.preventDefault();
        axios.post("/login", this.state)
            .then(res => { if (res.data === true) {
                location.replace("/");
            } else {
                this.setState({ error: true});
            }}).catch(err => {
                this.setState({ error: true});
                console.log("err1", err);
            });

    }

    render() {
        return (
            <div>
                <div className="loginbox">
                    <form>
                        <input name="email" type="email" placeholder="email" onChange={e => this.formHasChanged(e)} />
                        <input name="password" type="password" placeholder="password" onChange={e => this.formHasChanged(e)} />
                        <button className="microbutton" onClick={e => this.buttonWasClicked(e)}>Submit</button>
                    </form>
                    <div className="welcome-text"> Not a member yet? <Link to="/" id="awel">Register here</Link> </div>
                    {this.state.error && <div className="welcome-text"><div className="smth">Something went wrong, please try again</div></div> }
                </div>
            </div>
        );
    }
}
