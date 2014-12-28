/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var GitHubModel = require('../models/GitHubModel');

/**
 * Helper for the GitHub service.
 */
var GitHubHelper = {

  /**
   * Sorts a GitHubRepoList's repos based on the given sort parameters.
   *
   * @param {GitHubRepoList} gitHubRepoList The GitHubRepoList to sort.
   * @param {Array.<GitHubRepoListSortParameters>} An array of parameters based
   * on which the repos will be sorted.
   * @returns {GitHubRepoList} The sorted GitHubRepoList.
   */
	sortBy(gitHubRepoList, sortParameters) {
    if (!gitHubRepoList || !Array.isArray(sortParameters)) {
      return gitHubRepoList;
    }

    var compareFunc = function(a, b) {
      var sortParam, diff = 0;
      for (var s = 0, len = sortParameters.length; s < len; s++) {
        sortParam = sortParameters[s];
        diff = b[sortParam] - a[sortParam];
        if (diff !== 0) {
          return diff;
        }
      }
      return diff;
    };

    var reposClone = gitHubRepoList.repos.slice(0);
    return GitHubModel.createGitHubRepoList(gitHubRepoList.userId, reposClone.sort(compareFunc));
	}

};

module.exports = GitHubHelper;