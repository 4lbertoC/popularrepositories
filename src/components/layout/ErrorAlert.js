/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var GitHubStore = require('../../stores/GitHubStore');

/**
 * Gets the new state for this component.
 *
 * @returns {{gitHubError: GitHubError}}
 */
function getState() {
  return {
    gitHubError: GitHubStore.getGitHubError()
  };
}

var ErrorAlert = React.createClass({

  mixins: [GitHubStore.Mixin],

  getInitialState() {
    return getState();
  },

  render() {
  	var gitHubError = this.state.gitHubError;

  	if (gitHubError) {
        /* jshint ignore: start */
  		return (
  			<div className="error-alert">
  				<div className="alert alert-danger" role="alert">
	  				{gitHubError.message}
          </div>
  			</div>
		  );
      /* jshint ignore: end */
  	} else {
      return (
        /* jshint ignore: start */
        <div className="error-alert hidden"></div>
        /* jshint ignore: end */
      );
    }
  },

  /**
   * Event handler for 'change' events coming from the GitHubStore.
   */
  onChange() {
    this.setState(getState());
  }

});

module.exports = ErrorAlert;
