/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var PageStore = require('../../stores/PageStore');
var Link = require('../common/Link');
var Navbar = require('../layout/Navbar');

/**
 * Retrieves the current page metadata from the PageStore.
 * @returns {{title: string}}
 */
function getState() {
  return {
    title: PageStore.get().title
  };
}

var DefaultLayout = React.createClass({

  mixins: [PageStore.Mixin],

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    PageStore.emitChange();
  },

  render() {
    return (
      /* jshint ignore:start */
      <div>
        <Navbar />
        {this.props.children}
      </div>
      /* jshint ignore:end */
    );
  },

  /**
   * Event handler for 'change' events coming from the PageStore.
   */
  onChange() {
    this.setState(getState());
  }
});

module.exports = DefaultLayout;
