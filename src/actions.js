import axios from "./axios";

export function getFriends() {
    return axios.get("/frieeends")
        .then( res => {
            return {
                type: "LOAD_FRIENDS",
                friendsList: res
            };
        });}

export function acceeept(oid) {
    return axios.post("/accept/" + oid)
        .then(() => {
            return {
                type: 'ACC_FRIEND',
                acc: oid
            };
        })
        .catch(error => {
            console.log(error);
        });
}

export function eeend(oid) {
    return axios.post("/cancel/" + oid)
        .then(() => {
            return {
                type: 'END_FRIEND',
                acc: oid
            };
        })
        .catch(error => {
            console.log(error);
        });
}

export async function getTwenty(msgs) {
    return {
        type: 'LOAD_TWENTY',
        msgs
    };}


export async function sendOne(msgs) {
    return {
        type: 'ADD_ONE',
        msgs
    };}
