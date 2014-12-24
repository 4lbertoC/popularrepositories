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
 * @typedef GitHubRepo
 * @type {Object}
 * @property {number} key Required when iterating through the elements to generate the RepoListItems.
 * @property {string} name The name of the repo.
 * @property {number} id The ID of the repo.
 * @property {string} ownerUserId The user ID of the owner.
 * @property {string} description The description of the repo.
 * @property {boolean} isFork Whether this repo is a fork.
 * @property {number} stars The stars count.
 * @property {number} watchers The watchers count.
 * @property {number} forks The forks count.
 */

/**
 * @typedef GitHubRepoList
 * @type {Object}
 * @property {string} userId
 * @property {Array.<GitHubRepo>} repos
 */
var _gitHubRepoList;

/**
 * @typedef GitHubUserInfo
 * @type {Object}
 * @property {string} userId
 * @property {string} avatarUrl
 */
var _gitHubUserInfo;

/**
 * Finds a repo in a GitHubRepoList.
 *
 * @param {number} repoId The ID of the repo.
 * @param {GitHubRepoList} gitHubRepoList the repo list to search.
 */
function findRepoInList(repoId, gitHubRepoList) {
  if(gitHubRepoList) {
    var repos = gitHubRepoList.repos;
    for (var i = 0, len = repos.length; i < len; i++) {
      var curRepo = repos[i];
      if (curRepo.id === repoId) {
        return curRepo;
      }
    }
  }
}

/**
 * A Store that contains information about a user's GitHub account.
 */
var GitHubStore = new Store({

  /**
   * Gets a GitHub repo by its ID, if present in the store.
   *
   * @param {number} repoId
   * @returns {GitHubRepo}
   */
  getGitHubRepo(repoId) {
    return findRepoInList(repoId, _gitHubRepoList);
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

  if (action.actionType == ActionTypes.GITHUB.LOAD_REPO_LIST) {
    _gitHubRepoList = action.repoList;
    GitHubStore.emitChange();
  } else if (action.actionType == ActionTypes.GITHUB.LOAD_USER_INFO) {
    _gitHubUserInfo = action.userInfo;
    GitHubStore.emitChange();
  }

  return true; // No errors.  Needed by promise in Dispatcher.

});

module.exports = GitHubStore;