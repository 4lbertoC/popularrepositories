/**
 * A fake response received by the GitHub API for the url /users/:username
 */
module.exports = {
  ok: true,
  body: {
    'login': 'testUser',
    'id': 123,
    'avatar_url': 'https://avatars.githubusercontent.com/u/123?v=3',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/testUser',
    'html_url': 'https://github.com/testUser',
    'followers_url': 'https://api.github.com/users/testUser/followers',
    'following_url': 'https://api.github.com/users/testUser/following{/other_user}',
    'gists_url': 'https://api.github.com/users/testUser/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/testUser/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/testUser/subscriptions',
    'organizations_url': 'https://api.github.com/users/testUser/orgs',
    'repos_url': 'https://api.github.com/users/testUser/repos',
    'events_url': 'https://api.github.com/users/testUser/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/testUser/received_events',
    'type': 'User',
    'site_admin': false,
    'name': 'Test User',
    'company': null,
    'blog': 'http://example.com/',
    'location': 'Nowhere',
    'email': 'testUser@example.com',
    'hireable': false,
    'bio': null,
    'public_repos': 15,
    'public_gists': 0,
    'followers': 5,
    'following': 5,
    'created_at': '2011-12-23T19:15:12Z',
    'updated_at': '2014-12-23T18:47:33Z'
  }
};