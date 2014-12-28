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
jest.dontMock('../ErrorAlert');

describe('ErrorAlert', function() {

	var React, TestUtils, ErrorAlert;

	beforeEach(function() {
		React = require('react/addons');
	    TestUtils = React.addons.TestUtils;

	    ErrorAlert = require('../ErrorAlert');
	});

	it('has error-alert class', function() {
	    var Component = TestUtils.renderIntoDocument(React.createElement(ErrorAlert));

	    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'error-alert');
	    expect(element).toBeDefined();
	});

	it('is hidden if there is no error', function() {
		var Component = TestUtils.renderIntoDocument(React.createElement(ErrorAlert));

	    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'hidden');
	    expect(element).toBeDefined();
	});

	it('shows the alert if there is an error', function() {
		var GitHubStoreMock = require('../../../stores/GitHubStore');

	    // Make it return a fake GitHubError
	    GitHubStoreMock.getGitHubError = jest.genMockFunction().mockReturnValue(require.requireActual('../../../models/__mocks__/fakeGitHubError.js'));

	    var Component = TestUtils.renderIntoDocument(React.createElement(ErrorAlert));

	    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'alert');
	    expect(element).toBeDefined();
	});

});