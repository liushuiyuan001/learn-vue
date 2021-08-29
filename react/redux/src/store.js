import { createStore } from 'redux'
import reducer from './reducer'
// import devToolsEnhancer from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(reducer, composeWithDevTools());