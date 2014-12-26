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

/**
 * Generates a GitHubRepoLanguages object from the given languages object.
 *
 * @param {GitHubRepoLanguages} repoLanguages The languages object, as received from GitHub.
 */
function convertToGitHubRepoLanguages(repoLanguages) {
  var totalBytes = 0;
  var percentages = {};
  var language;

  // Calculate total size
  for (language in repoLanguages) {
    if (repoLanguages.hasOwnProperty(language)) {
      var bytes = repoLanguages[language];
      totalBytes += bytes;
    }
  }

  // Calculate percentages
  for (language in repoLanguages) {
    if (repoLanguages.hasOwnProperty(language)) {
      var percentage = (repoLanguages[language] * 100 / totalBytes).toFixed(2);
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
      name: repo.name,
      id: repo.id,
      ownerUserId: repo.owner.login,
      description: repo.description,
      isFork: repo.fork,
      /* jshint ignore:start */ // JSHint complains about underscore in variable names
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
    /* jshint ignore:start */ // JSHint complains about underscore in variable names
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
    // Authentication allows more requests per hour
    .auth(Settings.defaults.gitHub.oAuthToken, 'x-oauth-basic')
    .end(response => response.ok ? callback(response) : handleError(response));
}

/**
 * If the current user has more repos than those included in the
 * first request, a Link header is appended to the response. This header
 * contains the link to the next and last page of the total user's repos.
 *
 * @param {object} response The response received by GitHub.
 */
function hasMoreRepos(response) {
  return !!response.headers.link;
}

/**
 * Gets the URL template used to fetch other pages of the
 * user's repos.
 *
 * @param {string} linkHeader The Link header received with the response.
 * @returns {string} The url template.
 */
function getReposPageUrlTemplate(linkHeader) {
  var nextMatch = linkHeader.match(constants.LINK_MATCHERS.NEXT);
  if (nextMatch && nextMatch.length > 0) {
    var nextUrl = nextMatch[1];
    return nextUrl.replace(constants.LINK_MATCHERS.PAGE_NUMBER, constants.LINK_TEMPLATES.PAGE_NUMBER);
  }
}

/**
 * Gets the number of the page that follows the requested data.
 *
 * @param {string} linkHeader The Link header received with the response.
 * @returns {number}
 */
function getNextPageNumber(linkHeader) {
  return +linkHeader.match(constants.LINK_MATCHERS.NEXT_PAGE_NUMBER)[1];
}

/**
 * Gets the last page number for the requested data.
 *
 * @param {string} linkHeader The Link header received with the response.
 * @returns {number}
 */
function getLastPageNumber(linkHeader) {
  return +linkHeader.match(constants.LINK_MATCHERS.LAST_PAGE_NUMBER)[1];
}

/**
 * Creates the function to call when requesting the other pages
 * of the repos for the user. When all the requests have been processed,
 * the <code>onFinish</code> function will be called.
 *
 * @param {Array.<Request>} pendingRequests The array of pending requests.
 * @param {function(Array.<GitHubRepo>)} onMoreReposArrived The function to call
 * on the newly received GitHubRepos.
 * @param {function} onFinish The function to call when all the GitHubRepos
 * have been received.
 * @return {function(response)} The callback function.
 */
function createMoreGitHubReposCallback(pendingRequests, onMoreReposArrived, onFinish) {
  var req = function(response) {
    var gitHubRepos = convertToGitHubRepos(response.body);
    onMoreReposArrived(gitHubRepos);

    // Remove request from pendingRequests.
    pendingRequests.splice(pendingRequests.indexOf(req), 1);

    if(pendingRequests.length === 0) {
      onFinish();
    }
  };
  return req;
}

/**
 * Sends all the requests to get the other pages of the user's repos.
 * Each request is added to an array of pending requests.
 *
 * @param {string} urlTemplate The template used to make the request.
 * @param {number} nextPageNumber The next page (relative to the first) to request.
 * @param {number} lastPageNumber The last page to request.
 * @param {Array.<Request>} pendingRequests The array of pending requests.
 * @param {function(response)} callback The callback for each request.
 */
function sendMoreGitHubReposRequests(urlTemplate, nextPageNumber, lastPageNumber, pendingRequests, callback) {
    for(var i = nextPageNumber; i <= lastPageNumber; i++) {
      var reqUrl = format(urlTemplate, {
        pageNumber: i
      });
      var req = createRequest(reqUrl, callback);
      pendingRequests.push(req);
    }
}

/**
 * Requests more repos from GitHub.
 *
 * @param {object} response The first response. Its 'link' header contains
 * the URLs to the next and last request to perform.
 * @param {function(Array.<GitHubRepo>)} onMoreReposArrived Handles the newly arrived GitHubRepos.
 * @param {function()} onFinish Called when all the remaining repos have been fetched.
 */
function requestMoreGitHubRepos(response, onMoreReposArrived, onFinish) {
  var linkHeader = response.headers.link;
  
  var urlTemplate = getReposPageUrlTemplate(linkHeader);
  if (urlTemplate) {
    var nextPageNumber = getNextPageNumber(linkHeader);
    var lastPageNumber = getLastPageNumber(linkHeader);
    var pendingRequests = [];

    var callback = createMoreGitHubReposCallback(pendingRequests, onMoreReposArrived, onFinish);
    sendMoreGitHubReposRequests(urlTemplate, nextPageNumber, lastPageNumber, pendingRequests, callback);
  }
}

/**
 * Abstraction over the GitHub API v3.
 */
var GitHub = {

  /**
   * Asynchronously provides a GitHubRepoLanguages object for the given repo through the given callback.
   *
   * @param {string} userId The ID of the user of the repo.
   * @param {string} repoName The name of the repo.
   * @param {function(GitHubRepoLanguages)} callback The function that will be called when the
   GitHubRepoList is retrieved.
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
   * @param {function(GitHubRepoList)} callback The function that will be called when the GitHubRepoList
   * is retrieved.
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