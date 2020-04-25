import React from "react";
import { Link } from 'react-router-dom';
import axios from "./axios";


export default function Navigation({ first, last, prourl}) {

    function logout(e) {
        e.preventDefault();
        axios.get("/logout")
            .then( res => {
                if (res.data === true) {
                    window.location.href = "/welcome";}})
            .catch(err => {
                console.log("error cookie wipe", err);
            });
    }

    return (
        <div className="userHeader">
            <div><Link to='/' id="micro2">Microbia</Link></div>
            <div className="hbreak"></div>
            <div><Link to='/chatbox' style={{ color: 'white' }}>Chatbox</Link></div>
            <div><Link to='/users' style={{ color: 'white' }}>Find Microbes</Link></div>
            <div><Link to='/friends' style={{ color: 'white' }}>Friends</Link></div>
            <div><button onClick={e => logout(e)}>Log out</button></div>
            <div><Link to='/' style={{ color: 'white' }}><h4> {first} {last} </h4></Link></div>
            <div><Link to='/'><img src={prourl || "https://picsum.photos/200"} alt={first + " " + last} className="profHead" /></Link></div>
        </div>
    );
}
