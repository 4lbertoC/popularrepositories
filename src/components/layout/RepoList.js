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
var GitHubHelper = require('../../helpers/GitHubHelper');
var GitHubRepoListSortParameters = require('../../constants/GitHubRepoListSortParameters');

var RepoListItem = require('./RepoListItem');

function sortGitHubRepoList(gitHubRepoList) {
  return GitHubHelper.sortBy(gitHubRepoList, [
      GitHubRepoListSortParameters.STARS,
      GitHubRepoListSortParameters.WATCHERS,
      GitHubRepoListSortParameters.FORKS
    ]);
}

function getState() {
  var sortedGitHubRepoList = sortGitHubRepoList(GitHubStore.getGitHubRepoList());
  return {
    gitHubRepoList: sortedGitHubRepoList
  };
}

/**
 * A component that displays a user's GitHub repos as a list.
 *
 * @prop {string} gitHubUserId The ID of the user for which to show the repo list.
 */
var RepoList = React.createClass({

  mixins: [GitHubStore.Mixin],

  propTypes: {
    gitHubUserId: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return getState();
  },

  componentWillMount() {
    GitHubActions.loadRepoList(this.props.gitHubUserId);
  },

  render() {
    var gitHubRepoList = this.state.gitHubRepoList;

    /* jshint ignore:start */
    return gitHubRepoList ? (
      <ul className="list-group">
        {gitHubRepoList.repos.map(function(repo) {
          return (
            <RepoListItem gitHubRepo={repo} key={repo.key}/>
          );
        })}
      </ul>
    ) : (
      <div className="repolist-loading">Loading...</div>
    );
    /* jshint ignore:end */
  },

  /**
   * Event handler for 'change' events coming from the GitHubStore.
   */
  onChange() {
    this.setState(getState());
  }

});

module.exports = RepoList;
