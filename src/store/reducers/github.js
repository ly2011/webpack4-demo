import { ActionTypes } from '@/store/types';

export const initialState = {
  repos: {
    data: {},
    status: 'idle',
    message: '',
    query: ''
  }
}

const githubState = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GITHUB_GET_REPOS_REQUEST: {
      const data = state.repos.data[action.payload.query]
        ? state.repos.data[action.payload.query]
        : [];
      return {...state, ...{repos: {
        data: {
          [action.payload.query]: data
        },
        message: '',
        query: action.payload.query,
        status: 'running'
      }}};
    }
    case ActionTypes.GITHUB_GET_REPOS_SUCCESS: {
      return {...state, ...{
        repos: {
          data: {
            [state.repos.query]: action.payload.data || [],
          },
          status: 'loaded'
        }
      }};
    }
    case ActionTypes.GITHUB_GET_REPOS_FAILURE: {
      return {
        ...state,
        ...{
          repos: {
            message: action.payload.message || '',
            status: 'error'
          }
        }
      }
    }
    default:
      return state;
  }
}

export default githubState;
