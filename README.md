# Popular Repositories

A page containing the most popular repositories of a GitHub user.

Structure forked from [react-starter-kit](https://github.com/kriasoft/react-starter-kit).

### Optional parameters

In the current implementation, the `userId` can be changed through the query parameters.

For example, you can view the popular repositories of the user _bob_ by appending at the end of the url `?userId=bob`.

### Known Bugs

##### Watchers
The number of watchers returned by the GitHub API is the same as the stargazers. The correct number should be fetched from `GET /repos/:owner/:repo/subscribers`.