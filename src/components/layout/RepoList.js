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
var LoadingIcon = require('../common/LoadingIcon');

/**
 * Returns the first <code>n</code> elements of a given array.
 * If <code>n</code> is not defined or greater than the length of the
 * array, the entire array will be returned.
 *
 * @param {Array} array The input array.
 * @param {number} n The maximum number of elements to return.
 * @returns {Array} A copy of the input array containing only its first
 * <code>n</code> elements.
 */
function getFirstNElements(array, n) {
  return n ? array.slice(0, n) : array;
}

/**
 * Returns a sorted copy of a GitHubRepoList.
 *
 * @param {GitHubRepoList} The GitHubRepoList to sort.
 * @returns {GitHubRepoList} The sorted GitHubRepoList.
 */
function sortGitHubRepoList(gitHubRepoList) {
  return GitHubHelper.sortBy(gitHubRepoList, [
      GitHubRepoListSortParameters.STARS,
      GitHubRepoListSortParameters.WATCHERS,
      GitHubRepoListSortParameters.FORKS
    ]);
}

/**
 * Gets the new state for this component.
 *
 * @returns {{gitHubRepoList: GitHubRepoList, gitHubError: GitHubError}}
 */
function getState() {
  var sortedGitHubRepoList = sortGitHubRepoList(GitHubStore.getGitHubRepoList());
  return {
    gitHubRepoList: sortedGitHubRepoList,
    gitHubError: GitHubStore.getGitHubError()
  };
}

/**
 * A component that displays a user's GitHub repos as a list.
 *
 * @prop {string} gitHubUserId The ID of the user for which to show the repo list.
 * @prop {number} maxSize The maximum number of items in the list.
 */
var RepoList = React.createClass({

  mixins: [GitHubStore.Mixin],

  propTypes: {
    gitHubUserId: React.PropTypes.string.isRequired,
    maxSize: React.PropTypes.number
  },

  getInitialState() {
    return getState();
  },

  componentWillMount() {
    GitHubActions.loadRepoList(this.props.gitHubUserId);
  },

  render() {
    var gitHubRepoList = this.state.gitHubRepoList;
    var gitHubError = this.state.gitHubError;

    if (gitHubRepoList) {
      var repos = getFirstNElements(gitHubRepoList.repos, this.props.maxSize);

      /* jshint ignore:start */
      return (
        <div className="repo-list list-group">
          {repos.map(function(repo) {
            return (
              <RepoListItem gitHubRepo={repo} key={repo.id}/>
            );
          })}
        </div>
      );
      /* jshint ignore:end */
    } else if(gitHubError) {
      /* jshint ignore:start */
      return (<div className="repo-list"></div>);
      /* jshint ignore:end */
    } else {
      /* jshint ignore:start */
      return (
        <div className="repo-list repo-list-loading">
          <LoadingIcon />
        </div>
      );
      /* jshint ignore:end */
    }    
  },

  /**
   * Event handler for 'change' events coming from the GitHubStore.
   */
  onChange() {
    this.setState(getState());
  }

});

module.exports = RepoList;
