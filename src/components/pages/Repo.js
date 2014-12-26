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
var GitHubActions = require('../../actions/GitHubActions');
var GitHubStore = require('../../stores/GitHubStore');

var App = require('../layout/App');
var Link = require('../common/Link');
var LoadingIcon = require('../common/LoadingIcon');
var LanguageList = require('../layout/LanguageList');
var RepoBadgeList = require('../layout/RepoBadgeList');

var moment = require('moment');

function getState(userId, repoName) {
  return {
    gitHubRepo: GitHubStore.getGitHubRepo(userId, repoName),
    gitHubRepoLanguages: GitHubStore.getGitHubRepoLanguages(userId, repoName)
  };
}

var RepoPage = React.createClass({

  mixins: [GitHubStore.Mixin],

  statics: {
    layout: App
  },

  getInitialState() {
    return getState(this.props.userId, this.props.repoName);
  },

  componentWillMount() {
    PageActions.set({title: 'Repository'});
    GitHubActions.loadRepoLanguages(this.props.userId, this.props.repoName);
  },

  render() {
    /* jshint ignore:start */
    var backButton = (<Link to="/">Back to list</Link>);

    if (this.state.gitHubRepo && this.state.gitHubRepoLanguages) {
      var gitHubRepo = this.state.gitHubRepo;
      var gitHubRepoLanguages = this.state.gitHubRepoLanguages;

      return (
        <div className="container page repo-page">
          <div className="jumbotron text-center">
            <h1>{gitHubRepo.name}</h1>
            <p>Last updated {moment(gitHubRepo.lastUpdate).fromNow()}</p>
            <p>
              <RepoBadgeList gitHubRepo={gitHubRepo} />
            </p>
            <p className="repo-description">
              {gitHubRepo.description}
            </p>
          </div>
          <div className="well languages">
            <LanguageList gitHubRepoLanguages={gitHubRepoLanguages} />
          </div>
          {backButton}
        </div>
      );
    } else {
      return (
        <div className="container repo-page-loading">
          <LoadingIcon />
        </div>
      );
    }
    /* jshint ignore:end */
  },

  /**
   * Event handler for 'change' events coming from the GitHubStore.
   */
  onChange() {
    this.setState(getState(this.props.userId, this.props.repoName));
  }

});

module.exports = RepoPage;
