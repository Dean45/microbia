export default function reducer(state = {}, action) {
    if (action.type === "LOAD_FRIENDS") {
        const {friendsList} = action;
        state = {
            ...state,
            friendsList : friendsList.data
        };
    }

    if (action.type === 'ACC_FRIEND' || action.type == 'END_FRIEND' ) {
        if (state.friends) {
            state = {
                ...state,
                friendList: state.friends.map(
                    friend => {
                        if (friend.id != action.id) {
                            return friend;
                        } else {
                            return {
                                ...friend,
                                accepted: action.type == 'ACC_FRIEND'
                            };
                        }
                    }
                )
            };
        }}

    // //UNFACTORED VERSION
    //
    // if (action.type === "ACC_FRIEND") {
    //     // console.log("ADDfriendinReducer", action);
    //     if (state.friends) {
    //         state = {
    //             ...state,
    //             friendsList: state.friendsList.map(friend => {
    //                 if (friend.id != action.acc) {
    //                     return friend;
    //                 } else {
    //                     return {
    //                         ...friend,
    //                         accepted: true
    //                     };
    //                 }
    //             })
    //         };
    //     }}
    //
    // if (action.type === "END_FRIEND") {
    //     // console.log("ENDfriendinReducer", action);
    //     if (state.friends) {
    //         state = {
    //             ...state,
    //             friendsList: state.friendsList.map(friend => {
    //                 if (friend.id != action.acc) {
    //                     return friend;
    //                 } else {
    //                     return {
    //                         ...friend,
    //                         accepted: false
    //                     };
    //                 }
    //             })
    //         };
    //     }}

    if (action.type === 'LOAD_TWENTY') {
        const {msgs} = action;
        state = {
            ...state,
            msgs: msgs
        };

    }

    if (action.type === 'ADD_ONE') {
        state = {
            ...state,
            msgs : [...state.msgs, action.msgs]
        };

    }

    return state;
}
