/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global jest, describe, it, expect, beforeEach */

'use strict';

jest.dontMock('../LanguageList');

describe('LanguageList', function() {

  var React, TestUtils, LanguageList, Component;

  beforeEach(function() {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;

    LanguageList = require('../LanguageList');
    Component = TestUtils.renderIntoDocument(React.createElement(LanguageList, {
      gitHubRepoLanguages: require.requireActual('../../../services/__mocks__/fakeGitHubRepoLanguages.js')
    }));
    
  });

  it('has class language-list', function() {
    var element = TestUtils.findRenderedDOMComponentWithClass(Component, 'language-list');
    expect(element).toBeDefined();
  });

  it('displays the languages of the repo, and the respective percentages', function() {
    var languageElement = TestUtils.scryRenderedDOMComponentsWithClass(Component, 'language');
    expect(languageElement).toBeDefined();

    var languageNameElement = TestUtils.scryRenderedDOMComponentsWithClass(Component, 'language-name');
    expect(languageNameElement).toBeDefined();

    var percentageElement = TestUtils.scryRenderedDOMComponentsWithClass(Component, 'language-percentage');
    expect(percentageElement).toBeDefined();
  });

});
