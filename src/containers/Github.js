import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { getRepos } from "../store/actions/github";
import styles from './Github.scss';

class Github extends React.Component {
  state = {
    query: 'react'
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch(getRepos(query));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, github: { repos } } = this.props;
    const { github: { repos: nextRepos } } = nextProps;
    if (repos.status === 'running' && repos.status === 'error') {
      console.log(nextProps.message);
    }
  }

  handleClick = (e) => {
    const { query } = e.currentTarget.dataset;
    const { dispatch, github } = this.props;

    this.setState({
      query
    });

    if (!github.repos.data[query] || !github.repos.data[query].length) {
      dispatch(getRepos((query)));
    }
  };


  render() {
    const { query } = this.state;
    const { github } = this.props;
    let output;
    if (github.repos.data[query] && github.repos.status === 'loaded') {
      output = (
        <ul>
          {
            github.repos.data[query].map(item => (
              <li key={item.id}>
                <div className={styles['github-item']}>
                  <img src={item.owner.avatar_url} alt={item.owner.login}/>
                  <div>
                    <span>
                      <a href={item.html_url} target="_blank">{item.name}</a>
                      <small>{item.owner.login}</small>
                    </span>
                    <div>{item.description}</div>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      )
    } else {
      output = '<span>数据为空</span>';
    }

    return (
      <div className={styles.github}>
        <div className={styles['github-btn-group']}>
          <Button type="primary" data-query="react" onClick={this.handleClick}>React</Button>
          {' '}
          <Button type="primary" data-query="redux" onClick={this.handleClick}>Redux</Button>
        </div>
        <div className={styles['github-list']}>
          {output}
        </div>
      </div>
    );
  }

}

Github.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // github: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return { github: state.github }
}

export default connect(mapStateToProps)(Github);
