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
            <div className="language" key={languageName}>
              <h3 className="language-name">{languageName}</h3>
              <h5 className="language-percentage">{percentage}</h5>
            </div>
          );
        })}
      </div>
    ); 
    /* jshint ignore:end */
  }

});

module.exports = LanguageList;
