/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect */

'use strict';

jest.dontMock('string-template');
jest.dontMock('../GitHub');
jest.dontMock('../../helpers/GitHubHelper');

describe('GitHub', function() {

	describe('getRepoList(userId, callback)', function() {

		it('asynchronously provides a GitHubRepoList for the given userId through the given callback', function() {
			var GitHub = require('../GitHub');
			// Custom mock, returns fake response.
			var request = require('superagent');

			var testUserId = 'testUser';
			// GitHubRepoList expected for the fake response.
			var expectedGitHubRepoList = require.requireActual('../__mocks__/fakeGitHubRepoList.js');

			var myCallback = function(gitHubRepoList) {
				expect(gitHubRepoList).toEqual(expectedGitHubRepoList);
			};

			GitHub.getRepoList(testUserId, myCallback);
		});

	});

	describe('getUserInfo(userId, callback)', function() {

		it('asynchronously provides the GitHubUserInfo for the given userId through the given callback', function() {
			var GitHub = require('../GitHub');
			// Custom mock, returns fake response.
			var request = require('superagent');

			var testUserId = 'testUser';
			// GitHubUserInfo expected for the fake response.
			var expectedGitHubUserInfo = require.requireActual('../__mocks__/fakeGitHubUserInfo.js');

			var myCallback = function(gitHubUserInfo) {
				expect(gitHubUserInfo).toEqual(expectedGitHubUserInfo);
			};

			GitHub.getUserInfo(testUserId, myCallback);
		});

	});

	describe('getRepoLanguages(userId, repoName, callback)', function() {

		it('asynchronously provides a GitHubRepoLanguages object for the given repo through the given callback.', function() {
			var GitHub = require('../GitHub');
			// Custom mock, returns fake response.
			var request = require('superagent');

			var testUserId = 'testUser';
			var testRepoName = 'testRepo1';
			// GitHubRepoLanguages expected for the fake response.
			var expectedGitHubRepoLanguages = require.requireActual('../__mocks__/fakeGitHubRepoLanguages.js');

			var myCallback = function(gitHubRepoLanguages) {
				expect(gitHubRepoLanguages).toEqual(expectedGitHubRepoLanguages);
			};

			GitHub.getRepoLanguages(testUserId, testRepoName, myCallback);
		});

	});

});