/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect */

'use strict';

var fakeRepoListResponse = require.requireActual('./fakeRepoListResponse.js');
var fakeUserInfoResponse = require.requireActual('./fakeUserInfoResponse.js');

var constants = {
	FAKE_URL: {
		REPO_LIST: 'repoList',
		USER_INFO: 'userInfo'
	},
	URL_REGEX: {
		REPO_LIST: /https:\/\/api\.github\.com\/users\/.+?\/repos/,
		USER_INFO: /https:\/\/api\.github\.com\/users\/.+?[\/]?$/
	}
};

/**
 * Mock of superagent.
 * Returns fake data for different request URLs.
 */
var superagentMock = {
	auth: jest.genMockFunction().mockReturnThis(),

	get: jest.genMockFunction().mockImplementation(function(url) {
		if (url.match(constants.URL_REGEX.REPO_LIST)) {
			this.url = constants.FAKE_URL.REPO_LIST;
		} else if (url.match(constants.URL_REGEX.USER_INFO)) {
			this.url = constants.FAKE_URL.USER_INFO;
		}
		return this;
	}),

	end: jest.genMockFunction().mockImplementation(function(callback) {
		if (this.url === constants.FAKE_URL.REPO_LIST) {
			callback(fakeRepoListResponse);
		} else if (this.url === constants.FAKE_URL.USER_INFO) {
			callback(fakeUserInfoResponse);
		}
	})
};

module.exports = superagentMock;