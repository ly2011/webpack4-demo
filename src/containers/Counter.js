import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Increment, Decrement,IncrementAsync } from "@/store/actions/counter";
class Counter extends React.Component {
  onIncrementAsync = () => {
    const { dispatch } = this.props;
    dispatch(IncrementAsync());
  };
  onIncrement = () => {
    const { dispatch } = this.props;
    dispatch(Increment());
  };
  onDecrement = () => {
    const { dispatch } = this.props;
    dispatch(Decrement());
  };
  render() {

    const { counter } = this.props;
    return (
      <div>
        <Button onClick={this.onIncrementAsync} type="primary">
          Increment after 1 second
        </Button>{' '}
        <Button onClick={this.onIncrement} type="primary">
          Increment
        </Button>{' '}
        <Button onClick={this.onDecrement} type="primary">
          Decrement
        </Button>{' '}
        <div>Clicked: { counter } times</div>
      </div>
    );
  }
};

Counter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
}
function mapStateToProps(state) {
  return { counter: state.counter }
}
export default connect(mapStateToProps)(Counter);
