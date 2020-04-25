import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

import axios from "./axios";

export default function FindPeople() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("/firstnine")
            .then( res => {
                setUsers(res.data);}
            ).catch(err => {
                console.log("errY", err);
            });

    }, [!search]);

    useEffect(() => {
        let ignore = false;
        if (search) {
            (async () => {
                const res = await axios.get("/match/" + search);
                if (!ignore) {
                    setUsers(res.data);}
            })();
        }
        return () => {
            ignore = true;};
    }, [search]);

    const onSearchChange = e => {setSearch(e.target.value);};

    return (
        <div>
            <div className="micro3">Find other microbes!</div>

            <div>
                <input onChange={onSearchChange} />
            </div>

            <div className="break">
                {!search && <div className="micro3">Our newest microbes:</div>}
                {search && <div className="micro3">Your results:</div>}
            </div>

            <div className="friends">
                {users.map(
                    user => <div key={user.id} className="friend">
                        <Link to={{ pathname: `/user/${user.id}`}}>
                            <div className="micro4"> {user.first} {user.last}</div>
                            <img src={user.prourl || `https://picsum.photos/200?random=${user.id}`} alt= {user.first + " " + user.last} className="profMid"/>
                        </Link>
                    </div>
                )}
            </div>

        </div>
    );

}
