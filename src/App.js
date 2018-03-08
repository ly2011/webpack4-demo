import React from 'react';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import reducer from './store/reducers';
// import rootSaga from './store/sagas';
import Counter from './containers/Counter';
import Github from '@/containers/Github'

import { store } from '@/store'
import { ActionTypes } from '@/store/types';

// const sagaMiddleware = createSagaMiddleware();

// export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(rootSaga);

// const action = (type, payload) => store.dispatch({ type, payload });

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Counter/>
{/*      <Counter
        value={store.getState()}
        onIncrement={() => action('INCREMENT')}
        onDecrement={() => action('DECREMENT')}
        onIncrementAsync={() => action('INCREMENT_ASYNC')}
      />*/}
      <Github/>
    </div>
  </Provider>

);
export default App;
