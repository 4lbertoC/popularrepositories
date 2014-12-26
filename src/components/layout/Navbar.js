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
var Link = require('../common/Link');
var UserInfo = require('./UserInfo');
var QueryStringHelper = require('../../helpers/QueryString');

var defaultGitHubUserId = require('../../constants/Settings').defaults.gitHub.userId;

var Navbar = React.createClass({

  render() {
    var gitHubUserId = QueryStringHelper.getQueryParameters().userId || defaultGitHubUserId;

    return (
      /* jshint ignore:start */
      <div className="navbar-top" role="navigation">
        <div className="container navbar-container">
          <Link className="navbar-brand row" to="/">
            <i className="fa fa-github-alt fa-lg navbar-icon"></i>
            <span className="navbar-title">Popular Repositories</span>
          </Link>
          <Link className="navbar-brand row pull-right" to="/">
            <UserInfo gitHubUserId={gitHubUserId} />
          </Link>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Navbar;
