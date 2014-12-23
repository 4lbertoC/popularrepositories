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
        This is a repo!
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = RepoPage;
