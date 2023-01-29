import * as actionTypes from './actionTypes';

export const sendMessage = (message) => {
    return {
        type: actionTypes.SEND_MESSAGE,
        payload: message,
    };
};

export const receiveMessage = (message) => {
    return {
        type: actionTypes.RECEIVE_MESSAGE,
        payload: message,
    };
};

export const addMessage = (text) => {
    return {
      type: 'ADD_MESSAGE',
      text
    }
  }
  
