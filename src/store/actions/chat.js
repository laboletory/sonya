export function updateMessage(message) {
    return {
      type: 'UPDATE_MESSAGE',
      payload: message,
    };
  }
  
  export function addToChatHistory(item) {
    return {
      type: 'ADD_TO_CHAT_HISTORY',
      payload: item,
    };
  }
  