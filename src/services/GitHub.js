/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

 'use strict';

var request = require('superagent');
var format = require('string-template');

var GitHubHelper = require('../helpers/GitHubHelper');
var Settings = require('../constants/Settings');

var constants = {
  LINK_MATCHERS: {
    LAST_PAGE_NUMBER: /<[^>]+page=([0-9]+)([^>]*)>; rel="last"/,
    NEXT_PAGE_NUMBER: /<[^>]+page=([0-9]+)([^>]*)>; rel="next"/,
    NEXT: /<([^>]+?)>; rel="next"/,
    PAGE_NUMBER: /page=([0-9]+)/
  },
  LINK_TEMPLATES: {
    PAGE_NUMBER: 'page={pageNumber}'
  },
  REQUEST_TEMPLATES: {
    LANGUAGES: 'https://api.github.com/repos/{userId}/{repoName}/languages',
    REPOS: 'https://api.github.com/users/{userId}/repos',
    USER: 'https://api.github.com/users/{userId}'
  }
};

// Needed to render the RepoListItem.
var repoListDataCumulativeKey = 0;

/**
 * Generates a GitHubRepoLanguages object from the given languages object.
 *
 * @param {GitHubRepoLanguages} repoLanguages The languages object, as received from GitHub.
 */
function convertToGitHubRepoLanguages(repoLanguages) {
  var totalBytes = 0;
  var percentages = {};
  var language;

  for (language in repoLanguages) {
    if (repoLanguages.hasOwnProperty(language)) {
      var bytes = repoLanguages[language];
      totalBytes += bytes;
    }
  }

  for (language in repoLanguages) {
    if (repoLanguages.hasOwnProperty(language)) {
      var percentage = Math.round(repoLanguages[language] * 100 / totalBytes);
      percentages[language] = percentage + '%';
    }
  }

  return percentages;
}

/**
 * Generates an array of GitHubRepos from the given array of repos.
 *
 * @param {Array.<object>} repos The repos, as received from GitHub.
 */
function convertToGitHubRepos(repos) {
  return repos.map(function(repo) {
    return {
      key: repoListDataCumulativeKey++,
      name: repo.name,
      id: repo.id,
      ownerUserId: repo.owner.login,
      description: repo.description,
      isFork: repo.fork,
      /* jshint ignore:start */ // Complains about underscore in variable names
      stars: repo.stargazers_count,
      watchers: repo.watchers_count,
      forks: repo.forks_count,
      lastUpdate: repo.updated_at
      /* jshint ignore:end */
    };
  });
}

/**
 * Generates a GitHubUserInfo from the given user info.
 *
 * @param {object} userInfo The user info, as received from GitHub.
 */
function convertToGitHubUserInfo(userInfo) {
  return {
    userId: userInfo.login,
    /* jshint ignore:start */ // Complains about underscore in variable names
    avatarUrl: userInfo.avatar_url
    /* jshint ignore:end */
  };
}

/**
 * Handles the error in the response.
 *
 * @param {Response} response The response object.
 */
function handleError(response) {
  // TODO Handle the error and show it to the user.
}

/**
 * Performs a GET request to the GitHub API.
 * 
 * @param {string} url The URL to get.
 * @param {function} callback The callback to call when done.
 * @returns {Request} The request object.
 */
function createRequest(url, callback) {
  return request.get(url)
    .auth(Settings.defaults.gitHub.oAuthToken, 'x-oauth-basic')
    .end(response => response.ok ? callback(response) : handleError(response));
}

/**
 * If the current user has more repos other than those included in the
 * first request, a Link header is appended to the response. This header
 * contains the link to the next and last page of the total user's repos.
 *
 * @param {object} response The response received by GitHub.
 */
function hasMoreRepos(response) {
  return !!response.headers.link;
}

/**
 * Request more repos from GitHub.
 *
 * @param {object} response The first response. Its 'link' header contains
 * the URLs to the next and last request to perform.
 * @param {function(Array.<GitHubRepo>)} onMoreReposArrived Handles the newly arrived GitHubRepos.
 * @param {function()} onFinish Called when all the remaining repos have been fetched.
 */
function requestMoreGitHubRepos(response, onMoreReposArrived, onFinish) {
  var link = response.headers.link;
  
  var nextMatch = link.match(constants.LINK_MATCHERS.NEXT);
  if (nextMatch && nextMatch.length > 0) {
    var nextUrl = nextMatch[1];
    var urlTemplate = nextUrl.replace(constants.LINK_MATCHERS.PAGE_NUMBER, constants.LINK_TEMPLATES.PAGE_NUMBER);
    var nextPageNumber = +link.match(constants.LINK_MATCHERS.NEXT_PAGE_NUMBER)[1];
    var lastPageNumber = +link.match(constants.LINK_MATCHERS.LAST_PAGE_NUMBER)[1];

    var pendingRequests = [];

    var requestCallback = function(response) {
      var gitHubRepoList = convertToGitHubRepos(response.body);
      onMoreReposArrived(gitHubRepoList);

      // Remove request from pendingRequests.
      pendingRequests.splice(pendingRequests.indexOf(req), 1);

      if(pendingRequests.length === 0) {
        onFinish();
      }
    };

    for(var i = nextPageNumber; i <= lastPageNumber; i++) {
      var reqUrl = format(urlTemplate, {
        pageNumber: i
      });
      var req = createRequest(reqUrl, requestCallback);
      pendingRequests.push(req);
    }
  }
}

/**
 * Abstraction over the GitHub API v3.
 */
var GitHub = {

  /**
   * Asynchronously provides a GitHubRepoLanguages object for the given repo through the given callback.
   */
  getRepoLanguages(userId, repoName, callback) {
    var requestUrl = format(constants.REQUEST_TEMPLATES.LANGUAGES, {
      userId: userId,
      repoName: repoName
    });

    createRequest(requestUrl, response => {
      var languages = convertToGitHubRepoLanguages(response.body);
      callback(languages);
    });
  },

  /**
   * Asynchronously provides a GitHubRepoList for the given userId through the given callback.
   *
   * @param {string} userId The ID of the user for which to request the repo list.
   * @param {function(GitHubRepoList)} callback The function that will be called when the GitHubRepoList is retrieved.
   */
  getRepoList(userId, callback) {
    var requestUrl = format(constants.REQUEST_TEMPLATES.REPOS, {
      userId: userId
    });

    createRequest(requestUrl, response => {
        // response.body is the array of repos, as received by GitHub.
        var gitHubRepos = convertToGitHubRepos(response.body);

        var finish = function() {
          var gitHubRepoList = GitHubHelper.createGitHubRepoList(userId, gitHubRepos);
          callback(gitHubRepoList);
        };

        var addMoreGitHubRepos = function(otherGitHubRepos) {
          gitHubRepos = gitHubRepos.concat(otherGitHubRepos);
        };

        if (hasMoreRepos(response)) {
          requestMoreGitHubRepos(response, addMoreGitHubRepos, finish);
        } else {
          finish();
        }
      });
  },

  /**
   * Asynchronously provides the GitHubUserInfo for the given user through the given callback.
   *
   * @param {string} userId The ID of the user for which to request the info.
   * @param {function(GitHubUserInfo)} callback The function that will be called when the GitHubUserInfo is retrieved.
   */
  getUserInfo(userId, callback) {
    var requestUrl = format(constants.REQUEST_TEMPLATES.USER, {
      userId: userId
    });

    createRequest(requestUrl, response => {
      var gitHubUserInfo = convertToGitHubUserInfo(response.body);
      callback(gitHubUserInfo);
    });
  }

};

module.exports = GitHub;