/*
 * A set of test case data for GitHubHelper.sortBy().
 * Only the values needed to sort are included in the repos data.
 * An additional parameter is injected, 'expectedPosition'. This is
 * used in the tests to check that they have been sorted correctly.
 */
module.exports = {
  testCaseData: [{
    // sortBy stars
    repos: [{
      expectedPosition: 1,
      stars: 2,
      watchers: 5,
      forks: 7
    }, {
      expectedPosition: 0,
      stars: 4,
      watchers: 3,
      forks: 7
    }]
  }, {
    // sortBy stars
    repos: [{
      expectedPosition: 2,
      stars: 2,
      watchers: 4,
      forks: 0
    }, {
      expectedPosition: 0,
      stars: 12,
      watchers: 3,
      forks: 2
    }, {
      expectedPosition: 1,
      stars: 9,
      watchers: 5,
      forks: 0
    }]
  }, {
    // sortBy watchers
    repos: [{
      expectedPosition: 1,
      stars: 2,
      watchers: 4,
      forks: 0
    }, {
      expectedPosition: 2,
      stars: 12,
      watchers: 3,
      forks: 2
    }, {
      expectedPosition: 0,
      stars: 9,
      watchers: 5,
      forks: 0
    }]
  }, {
    // sortBy forks
    repos: [{
      expectedPosition: 2,
      stars: 2,
      watchers: 4,
      forks: 0
    }, {
      expectedPosition: 1,
      stars: 12,
      watchers: 3,
      forks: 2
    }, {
      expectedPosition: 0,
      stars: 9,
      watchers: 5,
      forks: 10
    }]
  }, {
    // sortBy watchers, forks, stars
    repos: [{
      expectedPosition: 2,
      stars: 5,
      watchers: 5,
      forks: 4
    }, {
      expectedPosition: 3,
      stars: 0,
      watchers: 5,
      forks: 4
    }, {
      expectedPosition: 1,
      stars: 2,
      watchers: 5,
      forks: 10
    }, {
      expectedPosition: 0,
      stars: 2,
      watchers: 9,
      forks: 0
    }]
  }]
};