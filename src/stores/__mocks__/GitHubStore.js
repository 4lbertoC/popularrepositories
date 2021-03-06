/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect */

'use strict';

var GitHubStoreMock = jest.genMockFromModule('../GitHubStore');

// Needed because they are created dynamically by the Store constructor
GitHubStoreMock.getGitHubError = jest.genMockFunction().mockImplementation(function() {});
GitHubStoreMock.getGitHubRepoList = jest.genMockFunction().mockImplementation(function() {});
GitHubStoreMock.getGitHubUserInfo = jest.genMockFunction().mockImplementation(function() {});
GitHubStoreMock.getGitHubRepo = jest.genMockFunction().mockImplementation(function() {});
GitHubStoreMock.getGitHubRepoLanguages = jest.genMockFunction().mockImplementation(function() {});

module.exports = GitHubStoreMock;