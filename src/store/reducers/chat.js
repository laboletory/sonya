const initialState = {
    message: '',
    chatHistory: [],
  };
  
  function chatReducer(state = initialState, action) {
    switch (action.type) {
      case 'UPDATE_MESSAGE':
        return {
          ...state,
          message: action.payload,
        };
      case 'ADD_TO_CHAT_HISTORY':
        return {
          ...state,
          chatHistory: [...state.chatHistory, action.payload],
        };
      default:
        return state;
    }
  }
  
  export default chatReducer;
  