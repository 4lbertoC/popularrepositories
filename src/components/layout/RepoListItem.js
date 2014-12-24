/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

// FIXME Webpack loaders are not used in the build process, so the build breaks.
// require('./RepoListItem.css');

var React = require('react');
var format = require('string-template');

var constants = {
  REPO_PAGE_URL: '/{ownerUserId}/{repoName}'
};

/**
 * An item of a RepoList component.
 * Uses glyphicon-cutlery for "fork", as the right one is not provided
 * by default with bootstrap.
 *
 * @prop {string} name The name of the repo.
 */
var RepoListItem = React.createClass({

  propTypes: {
    gitHubRepo: React.PropTypes.object.isRequired
  },


  render() {
    var gitHubRepo = this.props.gitHubRepo;
    var repoPageUrl = format(constants.REPO_PAGE_URL, {
      ownerUserId: gitHubRepo.ownerUserId,
      repoName: gitHubRepo.name
    });
    /* jshint ignore:start */
    return (
      <a className="repo-list-item list-group-item" href={repoPageUrl}>
        <span className="repo-name">{gitHubRepo.name}</span>
        <span className="badge">
          <span className="glyphicon glyphicon-cutlery" aria-hidden="true"></span>
          <span className="badge-text">{gitHubRepo.forks}</span>
        </span>
        <span className="badge">
          <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
          <span className="badge-text">{gitHubRepo.watchers}</span>
        </span>
        <span className="badge">
          <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
          <span className="badge-text">{gitHubRepo.stars}</span>
        </span>
      </a>
    );
    /* jshint ignore:end */
  },

});

module.exports = RepoListItem;
