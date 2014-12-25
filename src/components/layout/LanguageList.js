/*
 * Popular Repositories
 * Copyright (c) 2014 Alberto Congiu (@4lbertoC)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');

function mapObject(obj, func) {
  var results = [];
  if (obj) {
    for(var i in obj) {
      if (obj.hasOwnProperty(i)) {
        results.push(func(obj[i], i));
      }
    }
  }
  return results;
}

/**
 * A component that displays a GitHub repo's languages.
 *
 * @prop {GitHubRepoLanguages} gitHubRepoLanguages.
 */
var LanguageList = React.createClass({

  propTypes: {
    gitHubRepoLanguages: React.PropTypes.object.isRequired
  },

  render() {
    var gitHubRepoLanguages = this.props.gitHubRepoLanguages;

    /* jshint ignore:start */
    return (
      <div className="text-center language-list">
        {mapObject(gitHubRepoLanguages, (percentage, languageName) => {
          return (
            <span className="language" key={languageName}>
              <h1>{languageName}</h1> <h3>{percentage}</h3>
            </span>
          );
        })}
      </div>
    ); 
    /* jshint ignore:end */
  }

});

module.exports = LanguageList;
