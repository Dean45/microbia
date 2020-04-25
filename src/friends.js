import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, acceeept, eeend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const myFriends = useSelector(state => state.friendsList && state.friendsList.filter(
        friend => friend.acc == true
    ));
    const myWannabees = useSelector(state => state.friendsList && state.friendsList.filter(
        friend => friend.acc == false
    ));

    useEffect(() => {
        dispatch(getFriends());
    },[myFriends, myWannabees]);

    if (!myFriends && !myWannabees) {
        return null;
    }

    return (

        <React.Fragment>
            <div className="micro3">Your friends</div>
            <div className="friends">

                { myFriends && myFriends.map((friend, index) => {
                    return (
                        <div key={index} className="friend">
                            <div className="micro4"> {friend.first} {friend.last} </div>
                            <img src={friend.prourl || `https://picsum.photos/200?random=${index}`} alt= {friend.first + " " + friend.last} className="profMid"/>
                            <button className="microbutton"  onClick={() => dispatch(eeend(friend.id))}>End friendship</button>
                        </div>

                    );
                })}
            </div>

            <div className="micro3">Your wannabees</div>
            <div className="friends">

                { myWannabees && myWannabees.map((friend, index) => {
                    return (
                        <div key={index} className="friend">
                            <div className="micro4"> {friend.first} {friend.last} </div>
                            <img src={friend.prourl || `https://picsum.photos/200?random=${index}`} alt= {friend.first + " " + friend.last} className="profMid"/>
                            <button className="microbutton"  onClick={() => dispatch(acceeept(friend.id))}>Accept friendship</button>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}
