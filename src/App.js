import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Button } from 'antd';
import styles from './App.css';
import reducer from './store/reducers'
import rootSaga from './store/sagas'
import Counter from './containers/Counter';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({ type });

const App = () => (
  <div className="App">
    <button className={styles.button}>Button</button>
    <Button type="primary">Antd Button</Button>
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      ></Counter>
  </div>
)
export default App;
