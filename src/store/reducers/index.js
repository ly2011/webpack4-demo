// import { ActionTypes } from '@/store/types';
//
// export default function counter(state = 0, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'INCREMENT_IF_ODD':
//       return state % 2 !== 0 ? state + 1 : state;
//     case 'DECREMENT':
//       return state - 1 > 0 ? state - 1 : 0;
//     case ActionTypes.GITHUB_GET_REPOS_REQUEST: {
//       console.log('GITHUB_GET_REPOS_REQUEST: ', action);
//       // const data = state.repos.data[action.payload.query]
//       //   ? state.repos.data[action.payload.query]
//       //   : [];
//       return state;
//     }
//     default:
//       return state;
//   }
// }

import github from './github';
import counter from './counter'

export default { github, counter }
