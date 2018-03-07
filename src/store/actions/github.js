import { ActionTypes } from '@/store/types';

/**
 * Get Repos
 */
export function getRepos(query) {
  return {
    type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
    payload: { query }
  };
}
