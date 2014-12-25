/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var GitHub = require('../services/GitHub');

/**
 * Handles the GitHubRepoLanguages received by the GitHub service.
 *
 * @param {GitHubRepoLanguages} repoLanguages The repo languages.
 */
function handleRepoLanguages(userId, repoName, repoLanguages) {
  Dispatcher.handleViewAction({
    actionType: ActionTypes.GITHUB.LOAD_REPO_LANGUAGES,
    userId: userId,
    repoName: repoName,
    repoLanguages: repoLanguages
  });
}

/**
 * Handles the GitHubRepoList received by the GitHub service.
 *
 * @param {GitHubRepoList} repoList The repo list.
 */
function handleRepoList(repoList) {
  Dispatcher.handleViewAction({
    actionType: ActionTypes.GITHUB.LOAD_REPO_LIST,
    repoList: repoList
  });
}

/**
 * Handles the GitHubUserInfo received by the GitHub service.
 *
 * @param {GitHubUserInfo} userInfo
 */
function handleUserInfo(userInfo) {
  Dispatcher.handleViewAction({
    actionType: ActionTypes.GITHUB.LOAD_USER_INFO,
    userInfo: userInfo
  });
}

module.exports = {

  /**
   * Loads the languages for the given repo.
   *
   * @param {userId} The GitHub user ID.
   * @param {repoName} The GitHub repo name.
   */
  loadRepoLanguages(userId, repoName) {
    GitHub.getRepoLanguages(userId, repoName, repoLanguages => handleRepoLanguages(userId, repoName, repoLanguages));
  },

  /**
   * Loads the GitHub repo list for the given user.
   *
   * @param {userId} The GitHub user ID.
   */
  loadRepoList(userId) {
    GitHub.getRepoList(userId, handleRepoList);
  },

  /**
   * Loads the GitHubUserInfo for the given user.
   *
   * @param {userId} The GitHub user ID.
   */
   loadUserInfo(userId) {
    GitHub.getUserInfo(userId, handleUserInfo);
   }

};
