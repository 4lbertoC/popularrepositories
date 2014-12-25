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
var App = require('../layout/App');
var LanguageList = require('../layout/LanguageList');
var Link = require('../common/Link');
var GitHubStore = require('../../stores/GitHubStore');
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
              <span className="badge repo-badge">
                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                <span className="badge-text repo-badge-text">{gitHubRepo.stars}</span>
              </span>
              <span className="badge repo-badge">
                <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                <span className="badge-text repo-badge-text">{gitHubRepo.watchers}</span>
              </span>
              <span className="badge repo-badge">
                <span className="glyphicon glyphicon-cutlery" aria-hidden="true"></span>
                <span className="badge-text repo-badge-text">{gitHubRepo.forks}</span>
              </span>
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
        <div className="container">
          <h5>Loading...</h5>
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
