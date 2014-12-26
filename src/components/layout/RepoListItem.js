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
var RouteActions = require('../../actions/RouteActions');
var Link = require('../common/Link');
var RepoBadgeList = require('./RepoBadgeList');
var format = require('string-template');

var constants = {
  DEFAULT_PAGE: '#',
  REPO_PAGE_URL: '/repo/{userId}/{repoName}'
};

/**
 * An item of a RepoList component.
 *
 * @prop {GitHubRepo} gitHubRepo
 */
var RepoListItem = React.createClass({

  propTypes: {
    gitHubRepo: React.PropTypes.object.isRequired
  },

  render() {
    var gitHubRepo = this.props.gitHubRepo;
    var repoPageUrl = format(constants.REPO_PAGE_URL, {
      userId: gitHubRepo.ownerUserId,
      repoName: gitHubRepo.name
    }) || constants.DEFAULT_PAGE;

    /* jshint ignore:start */
    return (
      <Link className="repo-list-item list-group-item" to={repoPageUrl}>
        <span className="repo-name">{gitHubRepo.name}</span>
        <RepoBadgeList altStyle={true} gitHubRepo={gitHubRepo} />
      </Link>
    );
    /* jshint ignore:end */
  }

});

module.exports = RepoListItem;
