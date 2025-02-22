# Submitting Work

Before implementing a feature or a fix, it is usually best to discuss the proposed changes with
[team members](https://emberjs.com/team/). Some fixes might require new public API or changes to
existing public APIs. If this is the case, it is even more important to discuss the issue's problem
space and the proposed changes before diving too deep into the implementation.

## Making a PR

Submissions should be made as PRs against the `main` branch.

If a bugfix for an existing release is needed, that work should be cherry-picked to
secondary PRs targeting the appropriate release branches after being accepted to the
main branch.

### Writing Tests

All PRs should have accompanying tests. For bug-fixes, this should include tests that demonstrate
the issue being fixed and test that the solution works.

- We do write tests for our deprecations and assertion messages, using the `assert.expectAssertion()` and `assert.expectDeprecation()` helpers.
- Because we run tests in both development and `production` environments, assertions, deprecations and warnings may be stripped out. To avoid tests on failing for your PR in production environments, use the `testInDebug` function instead of `qunit` `test` to skip them in production when appropriate.
- Update the documentation, examples, and guides when affected by your contribution

### Running Tests

- PRs will automatically run an extensive set of test scenarios for your work. In some cases a contributor
  may need to approve the workflow run if this is your first contribution.
- `EmberData` is a collection of packages and comes with multiple test apps scoped to specific situations
  or parts of the codebase we want to test. Tests live in the test applications in `<project>/tests`. These should look like familiar ember app/addon tests, and to run them from within a specific test app use `pnpm test` or `pnpm test --serve`. For additional test commands see the list
  of commands in the respective `package.json` files.

### Pull Request Titles

PRs should be meaningfully titled to give context into the change for the changelog.

### Pull Request Labeling

All PRs should be labeled. PR labeling for changelog and backporting is enforced in CI,
but labels may only be applied by project maintainers. PRs from non-maintainers will be
labeled by maintainers prior to a PR being accepted and merged.

#### Changelog Labels

Labels used for the changelog include `skip-changelog` which should be used if the PR should not be considered for the changelog,
and any labels listed in the changelog config in the [root package.json](https://github.com/emberjs/data/blob/main/package.json).

These labels are prefixed with `changelog:` and currently the options are:

- `changelog:breaking` which should be used to signify a breaking change
- `changelog:feat` which should be used to signify an addition of a new public feature or behavior
- `changelog:bugfix` which should be used to signify a fix for a reported issue
- `changelog:perf` which should be used to signify that the commit will improve performance characteristics in a meaningful way
- `changelog:cleanup` which should be used to signify removal of deprecated features or that a deprecation has become an assertion.
- `changelog:deprecation` which should be used to signify addition of a new deprecation
- `changelog:doc` which should be used to signify a fix or improvement to documentation generated for api.emberjs.com
- `changelog:test` which should be used to signify addition of new tests or refactoring of existing tests
- `changelog:chore` which should be used to signify refactoring of internal code that should not have an affect on public APIs or behaviors but which we may want to call out for potentially unintended consequences.

#### Backporting Labels

We use one set of labels to indicate that a PR needs to be backported and where it needs to be backported to, and a second set of labels to indicate that a PR **is** the backport PR.

To indicate that a PR should be backported, the following labels, all prefixed with `target:` are available:

- `target:canary` indicates that a PR will not require backporting.
- `target:beta` indicates the PR requires being backported to the current beta release.
- `target:release` indicates the PR requires being backported to the current active release.
- `target:lts` indicates that a PR requires being backported to the most current LTS release.
- `target:lts-prev` indicates that a PR requires being backported to the second-most recent LTS release.

Note: a PR should add the individual label for _every_ backport target required. We use this while releasing to search
for any commits still requiring backport to include, and will eventually automate opening backport PRs via a bot when
these labels are present. We remove the `target:` label from merged PRs only once the backport PR has been opened.

To indicate that a PR **is** the backport PR, the following labels, all prefixed with `backport-` are available:

- `backport-beta` for PRs to the beta branch
- `backport-release` for PRs to the current active release branch
- `backport-old-release` for PRs to previous release branches that are not LTS branches
- `backport-lts` for PRs targetting the current active LTS branch
- `backport-lts-prev` for PRs targetting the second most current LTS branch

Note, we automatically add this label to any PR opened to a beta/release/lts branch, but for non-current non-lts backports
it will need to be added manually.

#### Project Labels

Labels used for tracking work in [various projects](https://github.com/emberjs/data/projects) are not enforced, but PRs and issues should be labeled for any applicable projects and added to those projects when reviewed.
