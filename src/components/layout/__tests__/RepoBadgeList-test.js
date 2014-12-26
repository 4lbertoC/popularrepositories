/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect, beforeEach */

'use strict';

jest.dontMock('../RepoBadgeList');

describe('RepoBadgeList', function() {

	var React, TestUtils, RepoBadgeList, Component;

	beforeEach(function() {
		React = require('react/addons');
	    TestUtils = React.addons.TestUtils;

	    RepoBadgeList = require('../RepoBadgeList');
	    Component = TestUtils.renderIntoDocument(React.createElement(RepoBadgeList, {
	    	gitHubRepo: require.requireActual('../../../services/__mocks__/fakeGitHubRepoList.js').repos[0]
	    }));
	});

	it('has class repo-badge-list', function() {
		var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'repo-badge-list');
	    expect(element).toBeDefined();
	});

	it('can have an alternative style when "altStyle" property is true', function() {
		var AltComponent = TestUtils.renderIntoDocument(React.createElement(RepoBadgeList, {
	    	gitHubRepo: require.requireActual('../../../services/__mocks__/fakeGitHubRepoList.js').repos[0],
	    	altStyle: true
	    }));

		var notAltElement = TestUtils.scryRenderedDOMComponentsWithClass(Component, 'repo-badge-list-alt');
	    expect(notAltElement).toEqual([]);

	    var altElement = TestUtils.findRenderedDOMComponentWithClass(AltComponent, 'repo-badge-list-alt');
	    expect(altElement).toBeDefined();
	});

	it('contains repo-badge elements', function() {
		var elements = TestUtils.scryRenderedDOMComponentsWithClass(Component, 'repo-badge');
	    expect(elements.length).toBeGreaterThan(0);
	});

});