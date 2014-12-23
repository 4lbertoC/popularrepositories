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

	getQueryParameters() {
		var rawQueryString;

		if (typeof window === 'undefined') {
			// We are not in the browser.
			// Webpack breaks without this check.
			rawQueryString = '';
		} else {
			rawQueryString = window.location.search.substr(1);
		}

		return querystring.parse(rawQueryString);
	}

};

module.exports = QueryStringHelper;