import React, {useEffect, useRef } from "react";
import {socket} from "./socket";
import {useSelector} from "react-redux";

export function Chat({id, first, last, prourl}) {
    const chatMessages = useSelector(
        state => state && state.msgs
    );

    const keyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("NewMsgForIndex", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();


    useEffect(() => {
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }),[];



    return (
        <div className="chat-window">

            <div className="chat-msgs" ref={elemRef}>
                <div className="micro4" style={{ float : 'right' }}>CHATBOX ~ a box to chat in</div>
                { chatMessages && chatMessages.map((msgs, index) => {
                    return (
                        <div key={index}>

                            <div className='chat-module'><img src={msgs.prourl || `https://picsum.photos/50?random=${index}`} alt= {msgs.first + " " + msgs.last} className="profSmol"/>
                                <div className='chat-module2'><div className="name"> {msgs.first} {msgs.last} </div><div className="msg">{msgs.msg}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className='chat-module'><img src={prourl || `https://picsum.photos/50?random=${id}`} alt= {first + " " + last} className="profSmol"/>
                    <div className='chat-module2'><div className="name"> {first} {last} </div> <textarea placeholder="Add your message here" cols="100" rows="4" onKeyDown={keyDown}/>
                    </div>
                </div>


            </div>

        </div>
    );
}
