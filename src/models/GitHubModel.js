/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* jshint camelcase: false */

'use strict';

/**
 * Represents a GitHub repository.
 *
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
 * A list of GitHub repositories.
 *
 * @typedef GitHubRepoList
 * @type {Object}
 * @property {string} userId
 * @property {Array.<GitHubRepo>} repos
 */

 /**
 * Contains information about a GitHub user.
 *
 * @typedef GitHubUserInfo
 * @type {Object}
 * @property {string} userId
 * @property {string} avatarUrl
 */

 /**
 * The list of languages used in a repo, with the relative percentage.
 *
 * @typedef GitHubRepoLanguages
 * @type {Array.<string, string>}
 */

/**
 * An error received by the GitHub service.
 *
 * @typedef GitHubError
 * @type {object}
 * @property {string} message
 */

/**
 * Custom GitHub models used in the application.
 */
var GitHubModel = {
/**
 * A map containing the GitHubRepoLanguages of the repos.
 * The key is in the form 'userId#repoName'.
 *
 * @typedef GitHubRepoLanguagesList
 * @type {Object.<string, GitHubRepoLanguages>}
 */

	/**
	 * Generates a GitHubRepoLanguages object from the given languages object.
	 *
	 * @param {Object} repoLanguages The languages object, as received from GitHub.
   * @returns {GitHubRepoLanguages}
	 */
	createGitHubRepoLanguages(repoLanguages) {
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
	},

  /**
   * Creates a GitHubRepoList.
   *
   * @param {string} userId The ID of the GitHub user.
   * @param {Array.<GitHubRepo>} gitHubRepos The list of GitHubRepos.
   * @returns {GitHubRepoList}
   */
  createGitHubRepoList(userId, gitHubRepos) {
    return {
      userId: userId,
      repos: gitHubRepos
    };
  },

	/**
	 * Generates an array of GitHubRepos from the given array of repos.
	 *
	 * @param {Array.<object>} repos The repos, as received from GitHub.
   * @return {Array.<GitHubRepo>}
	 */
	createGitHubRepos(repos) {
	  return repos.map(function(repo) {
	    return {
	      name: repo.name,
	      id: repo.id,
	      ownerUserId: repo.owner.login,
	      description: repo.description,
	      isFork: repo.fork,
	      stars: repo.stargazers_count,
	      watchers: repo.watchers_count,
	      forks: repo.forks_count,
	      lastUpdate: repo.updated_at
	    };
	  });
	},

	/**
	 * Generates a GitHubUserInfo from the given user info.
	 *
	 * @param {object} userInfo The user info, as received from GitHub.
   * @returns {GitHubUserInfo}
	 */
	createGitHubUserInfo(userInfo) {
	  return {
	    userId: userInfo.login,
	    avatarUrl: userInfo.avatar_url
	  };
	}
};

module.exports = GitHubModel;
