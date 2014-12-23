/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var PageActions = require('../../actions/PageActions');
var App = require('../layout/App');
var QueryStringHelper = require('../../helpers/QueryString');
var RepoList = require('../layout/RepoList');

var defaultGitHubUserId = require('../../constants/Settings').defaults.gitHub.userId;

var HomePage = React.createClass({

  statics: {
    layout: App
  },

  componentWillMount() {
    PageActions.set({title: 'Popular Repositories'});
  },

  render() {
    var gitHubUserId = QueryStringHelper.getQueryParameters().userId || defaultGitHubUserId;

    return (
      /* jshint ignore:start */
      <div className="container">
        <div className="row">
          <div className="col-md-12 mainList">
            <h3>Repository list for {gitHubUserId}</h3>
            <RepoList gitHubUserId={gitHubUserId} />
          </div>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = HomePage;
