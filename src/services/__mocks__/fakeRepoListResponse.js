/**
 * A fake response received by the GitHub API for the url /users/:username/repos
 */
module.exports = {
  headers: [],
  body: [{
    'id': 234,
    'name': 'testRepo1',
    'full_name': 'testUser/testRepo1',
    'owner': {
      'login': 'testUser',
      'id': 12345,
      'avatar_url': 'https://avatars.githubusercontent.com/u/1282730?v=3',
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
      'site_admin': false
    },
    'private': false,
    'html_url': 'https://github.com/testUser/testRepo1',
    'description': 'This is a test repo',
    'fork': false,
    'url': 'https://api.github.com/repos/testUser/testRepo1',
    'forks_url': 'https://api.github.com/repos/testUser/testRepo1/forks',
    'keys_url': 'https://api.github.com/repos/testUser/testRepo1/keys{/key_id}',
    'collaborators_url': 'https://api.github.com/repos/testUser/testRepo1/collaborators{/collaborator}',
    'teams_url': 'https://api.github.com/repos/testUser/testRepo1/teams',
    'hooks_url': 'https://api.github.com/repos/testUser/testRepo1/hooks',
    'issue_events_url': 'https://api.github.com/repos/testUser/testRepo1/issues/events{/number}',
    'events_url': 'https://api.github.com/repos/testUser/testRepo1/events',
    'assignees_url': 'https://api.github.com/repos/testUser/testRepo1/assignees{/user}',
    'branches_url': 'https://api.github.com/repos/testUser/testRepo1/branches{/branch}',
    'tags_url': 'https://api.github.com/repos/testUser/testRepo1/tags',
    'blobs_url': 'https://api.github.com/repos/testUser/testRepo1/git/blobs{/sha}',
    'git_tags_url': 'https://api.github.com/repos/testUser/testRepo1/git/tags{/sha}',
    'git_refs_url': 'https://api.github.com/repos/testUser/testRepo1/git/refs{/sha}',
    'trees_url': 'https://api.github.com/repos/testUser/testRepo1/git/trees{/sha}',
    'statuses_url': 'https://api.github.com/repos/testUser/testRepo1/statuses/{sha}',
    'languages_url': 'https://api.github.com/repos/testUser/testRepo1/languages',
    'stargazers_url': 'https://api.github.com/repos/testUser/testRepo1/stargazers',
    'contributors_url': 'https://api.github.com/repos/testUser/testRepo1/contributors',
    'subscribers_url': 'https://api.github.com/repos/testUser/testRepo1/subscribers',
    'subscription_url': 'https://api.github.com/repos/testUser/testRepo1/subscription',
    'commits_url': 'https://api.github.com/repos/testUser/testRepo1/commits{/sha}',
    'git_commits_url': 'https://api.github.com/repos/testUser/testRepo1/git/commits{/sha}',
    'comments_url': 'https://api.github.com/repos/testUser/testRepo1/comments{/number}',
    'issue_comment_url': 'https://api.github.com/repos/testUser/testRepo1/issues/comments/{number}',
    'contents_url': 'https://api.github.com/repos/testUser/testRepo1/contents/{+path}',
    'compare_url': 'https://api.github.com/repos/testUser/testRepo1/compare/{base}...{head}',
    'merges_url': 'https://api.github.com/repos/testUser/testRepo1/merges',
    'archive_url': 'https://api.github.com/repos/testUser/testRepo1/{archive_format}{/ref}',
    'downloads_url': 'https://api.github.com/repos/testUser/testRepo1/downloads',
    'issues_url': 'https://api.github.com/repos/testUser/testRepo1/issues{/number}',
    'pulls_url': 'https://api.github.com/repos/testUser/testRepo1/pulls{/number}',
    'milestones_url': 'https://api.github.com/repos/testUser/testRepo1/milestones{/number}',
    'notifications_url': 'https://api.github.com/repos/testUser/testRepo1/notifications{?since,all,participating}',
    'labels_url': 'https://api.github.com/repos/testUser/testRepo1/labels{/name}',
    'releases_url': 'https://api.github.com/repos/testUser/testRepo1/releases{/id}',
    'created_at': '2013-05-26T17:27:28Z',
    'updated_at': '2013-12-21T18:09:06Z',
    'pushed_at': '2014-11-03T22:20:55Z',
    'git_url': 'git://github.com/testUser/testRepo1.git',
    'ssh_url': 'git@github.com:testUser/testRepo1.git',
    'clone_url': 'https://github.com/testUser/testRepo1.git',
    'svn_url': 'https://github.com/testUser/testRepo1',
    'homepage': null,
    'size': 1052,
    'stargazers_count': 123,
    'watchers_count': 456,
    'language': 'JavaScript',
    'has_issues': true,
    'has_downloads': true,
    'has_wiki': true,
    'has_pages': false,
    'forks_count': 7,
    'mirror_url': null,
    'open_issues_count': 0,
    'forks': 7,
    'open_issues': 0,
    'watchers': 456,
    'default_branch': 'master'
  }]
};