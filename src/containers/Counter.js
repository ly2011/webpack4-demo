import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) => {
  return (
    <div>
      <Button onClick={onIncrementAsync} type="primary">Increment after 1 second</Button>
      {' '}
      <Button onClick={onIncrement} type="primary">Increment</Button>
      {' '}
      <Button onClick={onDecrement} type="primary">Decrement</Button>
      <div>
        Clicked: {value} times
      </div>
    </div>
  )
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter;
