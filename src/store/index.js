/*
* @Author: ly2011
* @Date:   2018-03-07 16:24:47
* @Last Modified by:   ly2011
* @Last Modified time: 2018-03-07 16:45:27
*/
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers'
import rootSaga from "./sagas/index";

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  ...rootReducer,
  router: routerReducer
})

const configStore = (initialState = {}) => {
  const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore);
  const store = createStoreWithMiddleware(reducer, initialState);
  sagaMiddleware.run(rootSaga);

  return {
    store
  }
}

const {store} = configStore();

export { store };
