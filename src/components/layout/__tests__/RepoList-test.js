/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect */

'use strict';

jest.dontMock('object-assign'); // Needed for the Dispatcher's dyamic methods.
jest.dontMock('../RepoList');
jest.dontMock('../RepoListItem');
jest.dontMock('../../common/Link');

describe('RepoList', function() {

	it('shows a loading message if the repo list has not yet been loaded', function() {
		var React = require('react/addons');
	    var TestUtils = React.addons.TestUtils;

	    var RepoList = require('../RepoList');
	    var Component = TestUtils.renderIntoDocument(React.createElement(RepoList, {
	    	gitHubUserId: 'testUser'
	    }));

	    var loadingElement = TestUtils.findRenderedDOMComponentWithClass(Component, 'repo-list-loading');
	    expect(loadingElement).toBeDefined();
	});

	it('shows a list of RepoListItems when the data is received from GitHub', function() {
		var React = require('react/addons');
	    var TestUtils = React.addons.TestUtils;

	    var GitHubStoreMock = require('../../../stores/GitHubStore');

	    // Make it return a fake GitHubRepoList
	    GitHubStoreMock.getGitHubRepoList = jest.genMockFunction().mockReturnValue(require.requireActual('../../../models/__mocks__/fakeGitHubRepoList.js'));

	    var RepoList = require('../RepoList');
	    var Component = TestUtils.renderIntoDocument(React.createElement(RepoList, {
	    	gitHubUserId: 'testUser'
	    }));

	    var repoListItemElement = TestUtils.findRenderedDOMComponentWithClass(Component, 'repo-list-item');
	    expect(repoListItemElement).toBeDefined();
	});

	it('shows nothing if there is an error and no data has been loaded', function() {
		var React = require('react/addons');
	    var TestUtils = React.addons.TestUtils;

	    var GitHubStoreMock = require('../../../stores/GitHubStore');

	    // Make it return a fake GitHubError
	    GitHubStoreMock.getGitHubError = jest.genMockFunction().mockReturnValue(require.requireActual('../../../models/__mocks__/fakeGitHubError.js'));

	    var RepoList = require('../RepoList');
	    var Component = TestUtils.renderIntoDocument(React.createElement(RepoList, {
	    	gitHubUserId: 'testUser'
	    }));

	    var emptyRepoListElement = TestUtils.findRenderedDOMComponentWithClass(Component, 'repo-list');
	    expect(emptyRepoListElement).toBeDefined();
	    expect(emptyRepoListElement.getDOMNode().children.length).toBe(0);
	});

});