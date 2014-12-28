/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect, beforeEach, afterEach */

'use strict';

jest.dontMock('../GitHubHelper');
jest.dontMock('../../models/GitHubModel');
jest.dontMock('../../constants/GitHubRepoListSortParameters');

function isOrderCorrect(gitHubRepoList) {
	return gitHubRepoList.repos.reduce(function(isSorted, repo, idx) {
		return isSorted && (repo.expectedPosition === idx);
	}, true);
}

describe('GitHubHelper', function() {

	describe('sortBy(gitHubRepoList, sortParameters)', function() {

		var testCaseData = require.requireActual('../../models/__mocks__/fakeGitHubRepoList2.js').testCaseData;
		var GitHubHelper, GitHubRepoListSortParameters, testGitHubRepoList, sortedGitHubRepoList;

		beforeEach(function() {
			GitHubHelper = require('../GitHubHelper');
			GitHubRepoListSortParameters = require('../../constants/GitHubRepoListSortParameters');
		});

		it('returns the sorted repo list based on the given parameters', function() {
			testGitHubRepoList = testCaseData[0];
			sortedGitHubRepoList = GitHubHelper.sortBy(testGitHubRepoList, [GitHubRepoListSortParameters.STARS]);
		});

		it('can sort by stars', function() {
			testGitHubRepoList = testCaseData[1];
			sortedGitHubRepoList = GitHubHelper.sortBy(testGitHubRepoList, [GitHubRepoListSortParameters.STARS]);
		});

		it('can sort by watchers', function() {
			testGitHubRepoList = testCaseData[2];
			sortedGitHubRepoList = GitHubHelper.sortBy(testGitHubRepoList, [GitHubRepoListSortParameters.WATCHERS]);
		});

		it('can sort by forks', function() {
			testGitHubRepoList = testCaseData[3];
			GitHubHelper.sortBy(testGitHubRepoList, [GitHubRepoListSortParameters.FORKS]);
		});

		it('can sort by a combination of stars, watchers and forks', function() {
			testGitHubRepoList = testCaseData[4];
			sortedGitHubRepoList = GitHubHelper.sortBy(testGitHubRepoList, [
				GitHubRepoListSortParameters.WATCHERS,
				GitHubRepoListSortParameters.FORKS,
				GitHubRepoListSortParameters.STARS
			]);
		});

		afterEach(function() {
			expect(isOrderCorrect(sortedGitHubRepoList)).toBeTruthy();
		});

	});

});