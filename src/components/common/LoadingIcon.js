/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');


/**
 * A loading icon.
 *
 */
var LoadingIcon = React.createClass({

  render() {
    /* jshint ignore:start */
    return (
      <span className="loading-icon">
        <img src="/images/loader.gif" />
      </span>
    );
    /* jshint ignore:end */
  }

});

module.exports = LoadingIcon;
