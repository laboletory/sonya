import { createStore } from 'redux';
import chatReducer from './reducers/chat';

const store = createStore(chatReducer);

export default store;
