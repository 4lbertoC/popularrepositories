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

var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var {Router} = require('director');
var Dispatcher = require('./core/Dispatcher');
var ActionTypes = require('./constants/ActionTypes');
var router;

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

Dispatcher.register((payload) => {

  var action = payload.action;

  switch (action.actionType)
  {
    case ActionTypes.NAVIGATION.SET_CURRENT_ROUTE:
      router.setRoute(action.route);
      break;

    case ActionTypes.NAVIGATION.SET_CURRENT_PAGE:
      if (ExecutionEnvironment.canUseDOM) {
        document.title = action.page.title;
      }
      break;

    case ActionTypes.GITHUB.LOAD_REPO:
      // TODO
      break;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

/**
 * Check if Page component has a layout property; and if yes, wrap the page
 * into the specified layout, then mount to document.body.
 */
function render(page, props) {
  var layout = null, child = null;
  while ((layout = page.type.layout || (page.defaultProps && page.defaultProps.layout))) {
    child = React.createElement(page, props, child);
    page = layout;
  }
  React.render(React.createElement(page, props, child), document.body);
}

// Define URL routes
// See https://github.com/flatiron/director
var routes = {
  '/': () => render(require('./components/pages/HomePage')),
  '/repo/:userId/:repoName': (userId, repoName) => render(require('./components/pages/RepoPage'), {
    userId: userId,
    repoName: repoName
  })
};

// Initialize a router
router = new Router(routes).configure({html5history: true}).init();
