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
var GitHubStore = require('../../stores/GitHubStore');
var moment = require('moment');

function getState(repoId) {
  return {
    gitHubRepo: GitHubStore.getGitHubRepo(+repoId)
  };
}

var RepoPage = React.createClass({

  mixins: [GitHubStore.Mixin],

  statics: {
    layout: App
  },

  getInitialState() {
    return getState(this.props.repoId);
  },

  componentWillMount() {
    PageActions.set({title: 'Repository'});
  },

  render() {
    if (this.state.gitHubRepo) {
      var gitHubRepo = this.state.gitHubRepo;

      return (
        /* jshint ignore:start */
        <div className="jumbotron">
          <h1>{gitHubRepo.name}</h1>
          <p>Last updated {moment(gitHubRepo.lastUpdate).fromNow()}</p>
        </div>
        /* jshint ignore:end */
      );
    } else {
      return (
        <div className="jumbotron">
          <h5>Loading...</h5>
        </div>
      );
    }
  },

  /**
   * Event handler for 'change' events coming from the GitHubStore.
   */
  onChange() {
    this.setState(getState(this.props.repoId));
  }

});

module.exports = RepoPage;
