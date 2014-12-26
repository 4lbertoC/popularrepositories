/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 *
 * Modified by @4lbertoC
 */

'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var QueryString = require('../helpers/QueryString');

module.exports = {

  /**
   * Set the current route.
   * @param {string} route Supply a route value, such as `todos/completed`.
   */
  setRoute(route) {
    var queryString = QueryString.getQueryString();

    if (queryString) {
      route += '?' + queryString;
    }

    Dispatcher.handleViewAction({
      actionType: ActionTypes.NAVIGATION.SET_CURRENT_ROUTE,
      route: route
    });
  }

};
