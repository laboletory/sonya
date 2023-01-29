// reducer.js
import { SEND_MESSAGE, RECEIVE_MESSAGE } from './actions';

const initialState = {
    chatHistory: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                chatHistory: [...state.chatHistory, { message: action.payload, isUser: true }]
            };
        case RECEIVE_MESSAGE:
            return {
                ...state,
                chatHistory: [...state.chatHistory, { message: action.payload, isUser: false }]
            };
        default:
            return state;
    }
};

export default reducer;
