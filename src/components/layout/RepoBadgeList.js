/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react/addons');

/**
 * A list of badges for a GitHubRepo.
 *
 * @prop {GitHubRepo} gitHubRepo.
 */
var RepoBadgeList = React.createClass({

  propTypes: {
    gitHubRepo: React.PropTypes.object.isRequired
  },

  render() {
    var gitHubRepo = this.props.gitHubRepo;
    var cx = React.addons.classSet;
    var classes = cx({
      'repo-badge-list': true,
      'repo-badge-list-alt': this.props.altStyle
    });

    /* jshint ignore:start */
    return (
      <div className={classes}>
        <span className="badge repo-badge">
          <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
          <span className="badge-text repo-badge-text">{gitHubRepo.stars}</span>
        </span>
        <span className="badge repo-badge">
          <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
          <span className="badge-text repo-badge-text">{gitHubRepo.watchers}</span>
        </span>
        <span className="badge repo-badge">
          <span className="fa fa-code-fork fa-lg repo-badge-icon-fix" aria-hidden="true"></span>
          <span className="badge-text repo-badge-text">{gitHubRepo.forks}</span>
        </span>
      </div>
    );
    /* jshint ignore:end */
  }

});

module.exports = RepoBadgeList;
