import React from 'react';
// import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Button } from 'antd';
import styles from './App.css';
import reducer from './store/reducers';
import rootSaga from './store/sagas';
import Counter from './containers/Counter';

import { ActionTypes } from '@/store/types';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const action = (type, payload) => store.dispatch({ type, payload });

const App = () => (
  <div className="App">
    <button className={styles.button}>Button</button>
    <Button type="primary">Antd Button</Button>
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      getRepos={() =>
        action(ActionTypes.GITHUB_GET_REPOS_REQUEST, { query: 'react' })
      }
    />
  </div>
);
export default App;
