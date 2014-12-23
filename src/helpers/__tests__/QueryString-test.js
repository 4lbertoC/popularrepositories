/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect */

'use strict';

jest.dontMock('querystring');
jest.dontMock('../QueryString');

describe('QueryString', function() {

	describe('getQueryParameters()', function() {

		it('returns the current URL\'s query parameters as a Javascript object', function() {
			var queryString = require('../QueryString');
			window.location.search = '?foo=bar';

			expect(queryString.getQueryParameters()).toEqual({
				foo: 'bar'
			});
		});

		it('returns an empty object if the URL has no query string', function() {
			var queryString = require('../QueryString');
			window.location.search = '';

			expect(queryString.getQueryParameters()).toEqual({});
		});

	});

});