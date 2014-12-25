/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var GitHubActions = require('../../actions/GitHubActions');
var GitHubStore = require('../../stores/GitHubStore');

/**
 * Gets the new state for this component.
 *
 * @returns {{gitHubRepoList: GitHubRepoList}}
 */
function getState() {
  return {
    gitHubUserInfo: GitHubStore.getGitHubUserInfo()
  };
}

/**
 * A component that shows the GitHub user's avatar and name.
 *
 * @prop {string} name The user id.
 */
var UserInfo = React.createClass({

  mixins: [GitHubStore.Mixin],

  propTypes: {
    gitHubUserId: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return getState();
  },

  componentWillMount() {
    GitHubActions.loadUserInfo(this.props.gitHubUserId);
  },

  render() {
    var gitHubUserInfo = this.state.gitHubUserInfo;
    /* jshint ignore:start */
    if (gitHubUserInfo) {
      return (
        <span className="user-info">
          <img className="user-avatar" src={gitHubUserInfo.avatarUrl} />
          <span className="user-id">{gitHubUserInfo.userId}</span>
        </span>
      );
    } else {
      return (
        <div className="user-info loading"></div>
      );
    }
    /* jshint ignore:end */
  },

  /**
   * Event handler for 'change' events coming from the GitHubStore.
   */
  onChange() {
    this.setState(getState());
  }

});


module.exports = UserInfo;
