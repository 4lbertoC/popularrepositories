/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
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
        <div className="container">
          <Link className="navbar-brand row" to="/">
            <img src="/images/logo-small.png" width="38" height="38" alt="React" />
            <span>Popular Repositories</span>
          </Link>
          <Link className="navbar-brand row navbar-right" to="/">
            <UserInfo gitHubUserId={gitHubUserId} />
          </Link>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Navbar;
