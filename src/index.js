import React from 'react';
import ReactDOM from 'react-dom';
import App, { store } from './App';
import './global.scss';

function render() {
  ReactDOM.render(<App />, document.getElementById('app'))
}
render();

store.subscribe(render);
