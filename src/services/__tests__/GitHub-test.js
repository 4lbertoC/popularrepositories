/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect, beforeEach */

'use strict';

jest.dontMock('string-template');
jest.dontMock('../GitHub');
jest.dontMock('../../models/GitHubModel');

describe('GitHub', function() {

	var GitHub, request, testUserId, testRepoName;

	beforeEach(function() {
		GitHub = require('../GitHub');
		// Custom mock, returns fake response.
		request = require('superagent');

		testUserId = 'testUser';
		testRepoName = 'testRepo1';
		
	});

	describe('getRepoList(userId, callback, errorCallback)', function() {

		it('asynchronously provides a GitHubRepoList for the given userId through the given callback', function() {
			// GitHubRepoList expected for the fake response.
			var expectedGitHubRepoList = require.requireActual('../../models/__mocks__/fakeGitHubRepoList.js');

			var callback = jest.genMockFunction().mockImplementation(function(gitHubRepoList) {
				expect(gitHubRepoList).toEqual(expectedGitHubRepoList);
			});

			var errorCallback = jest.genMockFunction();

			GitHub.getRepoList(testUserId, callback, errorCallback);
			expect(callback).toBeCalled();
			expect(errorCallback).not.toBeCalled();
		});

		it('calls the error callback if there is an error', function() {
			// Mocking the get method so that it returns an error.
			request.get = jest.genMockFunction().mockImplementation(function(url) {
				this.url = 'error';
				return this;
			});

			var callback = jest.genMockFunction();

			var errorCallback = jest.genMockFunction().mockImplementation(function(error) {
				expect(error).toEqual(require.requireActual('../../models/__mocks__/fakeGitHubError.js'));
			});

			GitHub.getRepoList(testUserId, callback, errorCallback);
			expect(callback).not.toBeCalled();
			expect(errorCallback).toBeCalled();
		});

	});

	describe('getUserInfo(userId, callback, errorCallback)', function() {

		it('asynchronously provides the GitHubUserInfo for the given userId through the given callback', function() {
			// GitHubUserInfo expected for the fake response.
			var expectedGitHubUserInfo = require.requireActual('../../models/__mocks__/fakeGitHubUserInfo.js');

			var callback = function(gitHubUserInfo) {
				expect(gitHubUserInfo).toEqual(expectedGitHubUserInfo);
			};

			var errorCallback = jest.genMockFunction();

			GitHub.getUserInfo(testUserId, callback, errorCallback);
			expect(errorCallback).not.toBeCalled();
		});

		it('calls the error callback if there is an error', function() {
			// Mocking the get method so that it returns an error.
			request.get = jest.genMockFunction().mockImplementation(function(url) {
				this.url = 'error';
				return this;
			});

			var callback = jest.genMockFunction();

			var errorCallback = jest.genMockFunction().mockImplementation(function(error) {
				expect(error).toEqual(require.requireActual('../../models/__mocks__/fakeGitHubError.js'));
			});

			GitHub.getUserInfo(testUserId, callback, errorCallback);
			expect(callback).not.toBeCalled();
			expect(errorCallback).toBeCalled();
		});

	});

	describe('getRepoLanguages(userId, repoName, callback, errorCallback)', function() {

		it('asynchronously provides a GitHubRepoLanguages object for the given repo through the given callback.', function() {
			// GitHubRepoLanguages expected for the fake response.
			var expectedGitHubRepoLanguages = require.requireActual('../../models/__mocks__/fakeGitHubRepoLanguages.js');

			var callback = jest.genMockFunction().mockImplementation(function(gitHubRepoLanguages) {
				expect(gitHubRepoLanguages).toEqual(expectedGitHubRepoLanguages);
			});

			var errorCallback = jest.genMockFunction();

			GitHub.getRepoLanguages(testUserId, testRepoName, callback, errorCallback);
			expect(callback).toBeCalled();
			expect(errorCallback).not.toBeCalled();
		});

		it('calls the error callback if there is an error', function() {
			// Mocking the get method so that it returns an error.
			request.get = jest.genMockFunction().mockImplementation(function(url) {
				this.url = 'error';
				return this;
			});

			var callback = jest.genMockFunction();

			var errorCallback = jest.genMockFunction().mockImplementation(function(error) {
				expect(error).toEqual(require.requireActual('../../models/__mocks__/fakeGitHubError.js'));
			});

			GitHub.getRepoLanguages(testUserId, testRepoName, callback, errorCallback);
			expect(callback).not.toBeCalled();
			expect(errorCallback).toBeCalled();
		});

	});

});