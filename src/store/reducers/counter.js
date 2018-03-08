/*
* @Author: ly2011
* @Date:   2018-03-07 16:27:37
* @Last Modified by:   ly2011
* @Last Modified time: 2018-03-07 16:43:37
*/
import { ActionTypes } from '@/store/types';

export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'INCREMENT_IF_ODD':
      return state % 2 !== 0 ? state + 1 : state;
    case 'DECREMENT':
      return state - 1 > 0 ? state - 1 : 0;
    default:
      return state;
  }
}
