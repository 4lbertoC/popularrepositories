'use strict';

var request = require('superagent');
var format = require('string-template');

var constants = {
  REQUEST_TEMPLATES: {
    REPOS: 'https://api.github.com/users/{userId}/repos'
  }
};

var repoListDataCumulativeKey = 0;

/**
 * Converts the response of a repo list received by the GitHub
 * API into a GitHubRepoList.
 *
 * @param {Array} response The repo list response as a Javascript array.
 * @returns {GitHubRepoList}
 * @private
 */
  function getRepoListData(userId, response) {
    return {
      userId: userId,
      repos: response.body.map(function(repo) {
        return {
          key: repoListDataCumulativeKey++,
          name: repo.name,
          ownerUserId: repo.owner.login,
          description: repo.description,
          isFork: repo.fork,
          /* jshint ignore:start */
          stars: repo.stargazers_count,
          watchers: repo.watchers_count,
          forks: repo.forks_count
          /* jshint ignore:end */
        };
      })
    };
  }

  /**
   * Abstraction over the GitHub API.
   */
var GitHub = {

  /**
   * Asynchronously provides a GitHubRepoList for the given userId through the given callback.
   *
   * @param {string} userId The ID of the user for which to request the repo list.
   * @param {function(GitHubRepoList)} callback The function to call when the GitHubRepoList is retrieved.
   */
  getRepoList(userId, callback) {
    var requestUrl = format(constants.REQUEST_TEMPLATES.REPOS, {
      userId: userId
    });

    request.get(requestUrl)
      .end(response => {
        // TODO read Link header and request the other pages too
        var repoListData = getRepoListData(userId, response);
        callback(repoListData);
      });
  }

};

module.exports = GitHub;