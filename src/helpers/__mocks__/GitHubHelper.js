/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect, beforeEach, afterEach */

'use strict';

var GitHubHelperMock = jest.genMockFromModule('../GitHubHelper');

GitHubHelperMock.sortBy = jest.genMockFunction().mockImplementation(function(repos, sortParameters) {
	return repos;
});

module.exports = GitHubHelperMock;