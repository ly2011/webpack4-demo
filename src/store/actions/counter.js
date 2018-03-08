// import { ActionTypes } from '@/store/types';

/**
 * Increment
 */
export function Increment(query) {
  return {
    type: 'INCREMENT',
    payload: { query }
  };
}

/**
 * Decrement
 */
export function Decrement(query) {
  return {
    type: 'DECREMENT',
    payload: { query }
  };
}

/**
 * IncrementAsync
 */
export function IncrementAsync(query) {
  return {
    type: 'INCREMENT_ASYNC',
    payload: { query }
  };
}
