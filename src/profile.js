import React from "react";
import BioEditor from "./bioeditor";

export default function Profile({first, last, prourl, bio, setBio, showModal}) {
    let pimg = prourl || "https://picsum.photos/200";
    return (
        <div className='myprofilebox'>
            <div className="micro3">Hey there {first} {last} !</div>
            <img onClick={showModal} src={pimg} alt={first + " " + last} className="profLarg" />
            <BioEditor bio={bio} setBio={setBio}/>
        </div>
    );
}
