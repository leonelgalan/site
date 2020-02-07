---
layout: page
title: Open Source
alt_title: Open Source Contributions
permalink: /os/
image: /assets/images/fabian-grohs-448419-unsplash.jpg
---

This is a list I've kept of my open source contributions. It feels great to
collaborate back to the projects that save me time and/or make my job easier.

## Ruby/Rails

### rails/rails

> Ruby on Rails

* [#27990 Use of ParameterFilter no longer forces `request.filtered_parameters` class to be Hash](https://github.com/rails/rails/pull/27990): Improves consistency of API
* [#30535 Ignores a default subclass when `becomes(Parent)`](https://github.com/rails/rails/pull/30535): Fixes: #30399 STI field with default makes it impossible to get an instance
  of the parent

### rails-api/active_model_serializers -> leonelgalan/rspec-active_model_serializers

> ActiveModel::Serializer implementation and Rails hooks
> Simple testing of ActiveModelSerializers via a collection of matchers.

* [#1947 Adds :have_valid_schema RSpec matcher](https://github.com/rails-api/active_model_serializers/pull/1947): Closed, abstracted to its own gem
* [#2046 Fixes bug in Test::Schema when using filter_parameters](https://github.com/rails-api/active_model_serializers/pull/2046)
* [#1 Fixes broken test](https://github.com/leonelgalan/rspec-active_model_serializers/pull/1)

### activeadmin/activeadmin

> The administration framework for Ruby on Rails applications.

* [#4216 Allows Hash-like objects to be used in attributes_table](https://github.com/activeadmin/activeadmin/pull/4216): Fixed bug reported by me

### alexreisner/geocoder

> Complete Ruby geocoding solution.

* [#1107 Allows radius to be a symbol representing a column in DB](https://github.com/alexreisner/geocoder/pull/1107)

### roidrage/lograge

> An attempt to tame Rails' default policy to log everything.

* [#218 Replaces thread storage with request_store](https://github.com/roidrage/lograge/pull/218)

### ankane/groupdate

> The simplest way to group temporal data

* [#115 Fixes error when using to `group_by_*`](https://github.com/ankane/groupdate/pull/115)
* [#151 Fixes time_range for quarter/last combination](https://github.com/ankane/groupdate/pull/151)
* [#175 Consistency between day_start and week_start](https://github.com/ankane/groupdate/pull/175): Merged in [361905e](https://github.com/ankane/groupdate/commit/361905ea29d272e58795d24ce7174d156fada501)

### 58bits/cloudfront-signer -> leonelgalan/cloudfront-signer

> Ruby gem for signing AWS CloudFront private content URLs and streaming paths.

* [#5 Separates url building and signing](https://github.com/58bits/cloudfront-signer/pull/5)
* [#6 Adds notice to README](https://github.com/58bits/cloudfront-signer/pull/6)
* [#1 Adds license to gemspec](https://github.com/leonelgalan/cloudfront-signer/pull/1)
* [#2 Refactor/3.x](https://github.com/leonelgalan/cloudfront-signer/pull/2): Major rewrite
* [#4 Fixes policy generation when specifying ip_range](https://github.com/leonelgalan/cloudfront-signer/pull/4)
* [#11 Support frozen strings](https://github.com/leonelgalan/cloudfront-signer/pull/11)

### binarylogic/settingslogic

* [#63 Adds an environment_vars_fallback to the Settingslogic class](https://github.com/binarylogic/settingslogic/pull/63): Closed, author recommended other gem that already had the feature I was proposing.

## Javascript

### [leonelgalan/asdfjkl](https://github.com/leonelgalan/asdfjkl)

> Determines if text contains gibberish.

I publish my first package to [NPM](https://www.npmjs.com/package/asdfjkl)

### Observable

> Observable is the magic notebook for exploring data and thinking with code.

Some of my best Javascript experiments are hosted here as [Observable Notebooks](https://observablehq.com/@leonelgalan). Including:

* A [US-Canada Map](https://observablehq.com/@leonelgalan/us-canada-map) with GeoJSON
* A [Multi-Hued Color Scale](https://observablehq.com/@leonelgalan/multi-hued-color-scales) generator using D3.
* An experiment [embedding web fonts into SVGs](https://observablehq.com/@leonelgalan/embedding-fonts-into-an-svg)

#### Other Repl

* [CodePen](https://codepen.io/leonelgalan)
* [Runkit](https://runkit.com/leonelgalan)

### pbeshai/use-query-param

> React Hook for managing state in URL query parameters with easy serialization.

* [#69 Suggestion: Add a `mapParamsToProps` to `withQueryParams`](https://github.com/pbeshai/use-query-params/issues/69): Open

### storybookjs/addon-jsx

> This Storybook addon show you the JSX / template of the story.

* [#97 feat: Upgrade react-element-to-jsx-string to latest version](https://github.com/storybookjs/addon-jsx/pull/97)

## Developer Tools

### Ansible

#### zzet/ansible-rbenv-role

> Ansible role for installing rbenv.

* [#22 Fixes system rbenv ruby install](https://github.com/zzet/ansible-rbenv-role/pull/22): Fixed regression
* [#25 Simplify rbenv_users interface: Username only](https://github.com/zzet/ansible-rbenv-role/issues/25): Improved API

#### ANXS/postgresql

> Fairly full featured Ansible role for Postgresql.

* [#62 Merges user privileges into correct role](https://github.com/ANXS/postgresql/pull/62): Fixed regression

#### smashingboxes/taperole

> 🕹 Application Server Provisioning and Deployment with Ansible

* [#23 Adds memcached](https://github.com/smashingboxes/taperole/pull/23): Added features
* [#32 Remove vendored roles from Repository](https://github.com/smashingboxes/taperole/pull/32): Cleanup
* [#36 Don't Install node.js from source](https://github.com/smashingboxes/taperole/pull/36): Major Rewrite
* [#38 Chore/fix vagrant](https://github.com/smashingboxes/taperole/pull/38): Cleanup/improves dev tools
* [#42 Installer updates](https://github.com/smashingboxes/taperole/pull/42): API Changes

#### leonelgalan/ansible-node

> Installs nodejs and the **latest** npm.

### Homebrew

#### caskroom/homebrew-cask

> A CLI workflow for the administration of Mac applications distributed as binaries

* [#1335 Updates Spectacle 0.7.3-74e5543](https://github.com/caskroom/homebrew-cask/pull/1335)
* [#1337 Adds Cask for Hall](https://github.com/caskroom/homebrew-cask/pull/1337)

### Static Analysis Tools

#### leonelgalan/linter-markdownlint

> Atom Linter for markdown using markdownlint/mdl

* [#8 Run `mdl` in in the projectPath](https://github.com/leonelgalan/linter-markdownlint/pull/8)

#### troessner/reek

> Code smell detector for Ruby

* [#402 Adds JSON output format](https://github.com/troessner/reek/pull/402)

#### atom/language-ruby-on-rails

> Ruby on Rails package for Atom

* [#38 Completes controller's callback list](https://github.com/atom/language-ruby-on-rails/pull/38)

#### AtomLinter/linter-codeclimate

> An Atom Linter plugin for the Code Climate CLI

* [#26 Adds support for reek and markdownlint](https://github.com/AtomLinter/linter-codeclimate/pull/26)

#### slim-template/language-slim

> Slim syntax package for Atom.

* [#22 Fixes embedded syntax highlighting](https://github.com/slim-template/language-slim/pull/22)

#### gilbarbara/codeclimate-stylelint

> A Code Climate engine for the mighty, modern CSS linter

* [#10 Exit 0 when analysisFiles is empty](https://github.com/gilbarbara/codeclimate-stylelint/pull/10)

___

<small>
  Photo by [Fabian Grohs](https://unsplash.com/photos/mCj7UinqOYQ) | "Coder
  Working on Macbook Pro"
</small>
