/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var Store = require('../core/Store');
var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

/**
 * @type {GitHubError}
 */
var _gitHubError;

/**
 * @type {GitHubRepoList}
 */
var _gitHubRepoList;

/**
 * @type {GitHubUserInfo}
 */
var _gitHubUserInfo;

/**
 * @type {GitHubRepoLanguagesList}
 */
 var _gitHubRepoLanguagesList = {};

/**
 * Finds a repo in a GitHubRepoList.
 *
 * @param {string} userId The ID of the user.
 * @param {string} repoName The name of the repo.
 * @param {GitHubRepoList} gitHubRepoList the repo list to search.
 */
function findRepoInList(userId, repoName, gitHubRepoList) {
  if(gitHubRepoList) {
    var repos = gitHubRepoList.repos;
    for (var i = 0, len = repos.length; i < len; i++) {
      var curRepo = repos[i];
      if (curRepo.ownerUserId === userId && curRepo.name === repoName) {
        return curRepo;
      }
    }
  }
}

/**
 * Generates a unique key for a given user's repository.
 *
 * @param {string} userId
 * @param {string} repoName
 */
function getRepoKey(userId, repoName) {
  return userId + '#' + repoName;
}

/**
 * A Store that contains information about a user's GitHub account.
 */
var GitHubStore = new Store({

  /**
   * Gets the last error received when performing a request to GitHub.
   *
   * @returns {GitHubError}
   */
  getGitHubError() {
    return _gitHubError;
  },

  /**
   * Gets a GitHub repo by its ID, if present in the store.
   *
   * @param {string} userId
   * @param {string} repoName
   * @returns {GitHubRepo}
   */
  getGitHubRepo(userId, repoName) {
    return findRepoInList(userId, repoName, _gitHubRepoList);
  },

  /**
   * Gets the percentages of the languages used in a GitHub repo.
   *
   * @param {string} userId
   * @param {string} repoName
   * @returns {object} The languages used. Key is the language name, value is the percentage.
   */
  getGitHubRepoLanguages(userId, repoName) {
    return _gitHubRepoLanguagesList[getRepoKey(userId, repoName)];
  },

  /**
   * Gets the current user's repo list.
   *
   * @returns {GitHubRepoList}
   */
  getGitHubRepoList() {
    return _gitHubRepoList;
  },

  /**
   * Gets the current user's info.
   *
   * @returns {GitHubUserInfo}
   */
  getGitHubUserInfo() {
    return _gitHubUserInfo;
  }

});

GitHubStore.dispatcherToken = Dispatcher.register(payload => {

  var action = payload.action;

  // Reset the error if the last action was successful.
  _gitHubError = null;

  if (action.actionType === ActionTypes.GITHUB.LOAD_REPO_LIST) {
    _gitHubRepoList = action.repoList;
  } else if (action.actionType === ActionTypes.GITHUB.LOAD_USER_INFO) {
    _gitHubUserInfo = action.userInfo;
  } else if (action.actionType === ActionTypes.GITHUB.LOAD_REPO_LANGUAGES) {
    var repoKey = getRepoKey(action.userId, action.repoName);
    _gitHubRepoLanguagesList[repoKey] = action.repoLanguages;
  } else if (action.actionType === ActionTypes.GITHUB.ERROR) {
    _gitHubError = action.error;
  }
  GitHubStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.

});

module.exports = GitHubStore;