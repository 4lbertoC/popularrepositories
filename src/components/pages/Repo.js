/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

 'use strict';

var React = require('react');
var PageActions = require('../../actions/PageActions');
var App = require('../layout/App');
var Link = require('../common/Link');

var RepoPage = React.createClass({

  statics: {
    layout: App
  },

  componentWillMount() {
    PageActions.set({title: 'Repository'});
  },

  render() {
    return (
      /* jshint ignore:start */
      <div className="container">
        This is the repo {this.props.repoId}
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = RepoPage;
