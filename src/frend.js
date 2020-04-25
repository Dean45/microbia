import React, {useState, useEffect} from "react";
import axios from "./axios";

export default function Frend({oid, mid}) {

    const [button, setButton] = useState("");
    useEffect(() => {
        axios.get("/frndchck/" + oid)
            .then( res => { setButton(res.data.button);}
            ).catch(err => {
                console.log("err", err);
            });

    }, []);

    const doButton = {
        "Cancel request" : function() {
            sendrequest("/cancel/" + oid);
        },
        "End frienship" : function() {
            sendrequest("/cancel/" + oid);
        },
        "Add friend": function() {
            sendrequest("/addit/" + oid);
        },
        "Accept friendship" : function() {
            sendrequest("/accept/" + oid);
        },
    };

    function sendrequest(url) {
        axios.post(url)
            .then( res => {
                setButton(res.data.button);}
            ).catch(err => {
                console.log("A", err);
            });
    }

    return (
        <React.Fragment>
            {button && <button className="microbutton" onClick={e => doButton[button](e)}>{button}</button>}
        </React.Fragment>
    );
}
