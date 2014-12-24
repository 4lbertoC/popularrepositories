/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect, beforeEach */

'use strict';

jest.dontMock('object-assign'); // Needed for the Dispatcher's dyamic methods.
jest.dontMock('../UserInfo');

describe('UserInfo', function() {

	var React, TestUtils, UserInfo, Component;

	beforeEach(function() {
		React = require('react/addons');
	    TestUtils = React.addons.TestUtils;

	    UserInfo = require('../UserInfo');
	    Component = TestUtils.renderIntoDocument(React.createElement(UserInfo, {
	    	gitHubUserId: 'testUser'
	    }));
	});

	it('shows the user\'s information', function() {
		var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'user-info');
	    expect(element).toBeDefined();
	});

	it('has a "loading" class if the user info has not yet been received', function() {
		var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'loading');
	    expect(element).toBeDefined();
	});

	it('shows the user\'s avatar and id when the user info has been received', function() {
		var GitHubStoreMock = require('../../../stores/GitHubStore');

	    // Make it return a fake GitHubRepoList
	    GitHubStoreMock.getGitHubUserInfo = jest.genMockFunction().mockReturnValue(require.requireActual('../../../services/__mocks__/fakeGitHubUserInfo.js'));

		UserInfo = require('../UserInfo');
	    Component = TestUtils.renderIntoDocument(React.createElement(UserInfo, {
	    	gitHubUserId: 'testUser'
	    }));

		var avatar = TestUtils.findRenderedDOMComponentWithClass(Component, 'user-avatar');
	    expect(avatar).toBeDefined();

		var userId = TestUtils.findRenderedDOMComponentWithClass(Component, 'user-id');
	    expect(userId).toBeDefined();
	});

});