import { SEND_MESSAGE, RECEIVE_MESSAGE } from './actionTypes';

const initialState = {
  chatHistory: [],
  message: ''
};

const chatReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        chatHistory: [...state.chatHistory, { message: action.payload }],
        message: ''
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        chatHistory: [...state.chatHistory, { message: action.payload }],
      };
    default:
      return state;
  }
};

export default chatReducer;
