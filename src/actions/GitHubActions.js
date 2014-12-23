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

module.exports = {

  /**
   * Load the GitHub repo list for the given user.
   *
   * @param {userId} The GitHub user ID.
   */
  loadRepoList(userId) {
    GitHub.getRepoList(userId, handleRepoList);
  }

};
