import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Button } from 'antd';
import styles from './App.css';
import reducer from './store/reducers'
import { helloSaga, watchIncrementAsync } from './store/sagas'
import Counter from './containers/Counter';

const sagaMiddleware = createSagaMiddleware();
// createSagaMiddleware 接受 Sagas 列表, 这些 Sagas 列表, 这些 Sagas 将会通过创建的 middleware 被立即执行(好像新版本不是这样子的)
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// createSagaMiddleware(helloSaga, watchIncrementAsync)
sagaMiddleware.run(helloSaga);
sagaMiddleware.run(watchIncrementAsync);

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
