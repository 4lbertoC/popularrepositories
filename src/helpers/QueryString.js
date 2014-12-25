/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var querystring = require('querystring');

var QueryStringHelper = {

	/**
	 * Gets the query parameters from the current URL as a Javascript object.
	 * @returns {object}
	 */
	getQueryParameters() {
		var rawQueryString = this.getQueryString();

		return querystring.parse(rawQueryString);
	},

	getQueryString() {
		if (typeof window === 'undefined') {
			// We are not in the browser.
			// Webpack breaks without this check.
			return '';
		} else {
			return window.location.search.substr(1);
		}
	}

};

module.exports = QueryStringHelper;