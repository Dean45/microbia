import * as io from "socket.io-client";

import { sendOne, getTwenty } from './actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on(
            'InitialMsgsForSocket',
            msgs => store.dispatch(
                getTwenty(msgs)
            )
        );

        socket.on(
            'NewMsgforSocket',
            msgs => store.dispatch(
                sendOne(msgs)
            )
        );
    }
};
