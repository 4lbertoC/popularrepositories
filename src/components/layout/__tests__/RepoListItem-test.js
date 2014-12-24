/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect */

'use strict';

jest.dontMock('../RepoListItem');
jest.dontMock('../../common/Link');

describe('RepoListItem', function() {

	it('has class list-group-item', function() {
		var React = require('react/addons');
	    var TestUtils = React.addons.TestUtils;

	    var RepoListItem = require('../RepoListItem');
	    var Component = TestUtils.renderIntoDocument(React.createElement(RepoListItem, {
	    	gitHubRepo: require.requireActual('../../../services/__mocks__/fakeGitHubRepoList.js').repos[0]
	    }));

	    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'repo-list-item');
	    expect(element).toBeDefined();
	});

});