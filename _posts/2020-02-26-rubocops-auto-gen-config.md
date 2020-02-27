---
layout: post
title: Rubocop's `--auto-gen-config`
date: 2020-02-26 12:00:00 -0400
image: /assets/images/posts/lenny-kuhne-jHZ70nRk7Ns-unsplash.jpg
---

I’ve always been fascinated with linters, code formatters and other static analysis tools. For Ruby, [Rubocop](https://www.rubocop.org/) is king, it will enforce many of the guidelines outlined in the community’s [Ruby Style Guide](https://rubystyle.guide/), but it’s flexible enough for you to decide how to write your code. Setting up Rubocop when first starting a project allows you to quickly fix all the initial offenses (150+ for a vanilla Rails installation, see below) and analyze your code constantly (on
save, on commit, before accepting a pull requests) to keep your project offense free.

A friend [tweeted](https://twitter.com/BrandonMathis/status/1232371983234600960) recently:

> “Looking for a way to increase your engineering team's velocity? Install a linter and stop arguing in PRs about code formatting/style.”

He’s right, I’ve spent countless hours debating: single vs. double quotes and spaces vs. tabs. But it really doesn’t matter, let’s write the code however we like and have a tool like Rubocop enforce the guidelines we’ve agreed beforehand.

I’ve been out of consulting for almost 5 years now, so I don’t get to start new Rails apps every couple of months. I created one today, to follow along a graphql tutorial (future blog post, maybe?) and stumble upon a feature from Rubocop I didn’t know: auto generate configuration. Let’s explore it together!

## Tutorial

### Setup and Defaults

Make sure you have installed your desired versions of both Ruby and Rails installed. At the time of this writing I wanted the latest 2.6 ruby and the latest Rails, which correspond to the versions shown below:

```sh
$ ruby -v
ruby 2.6.5p114 (2019-10-01 revision 67812) [x86_64-darwin19]
$ rails -v
Rails 6.0.2.1
```

Create a new Rails app and get inside the newly created directory:

```sh
$ rails new rubocop-app-demo
$ cd rubocop-app-demo
```

Open the `Gemfile` and add _rubocop_ and _rubocop-rails_ inside a `:development` group and add `require: false` to both lines according to the gems’ documentation [(1)](https://github.com/rubocop-hq/rubocop#installation)[(2)](https://github.com/rubocop-hq/rubocop-rails#installation):

```ruby
group :development do
  # ...

  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
end
```

Running rubocop without an explicit configuration (default) results in 172 offenses in 40 files:

```sh
$ rubocop --format offenses
 40/40 files |========================== 100 ===========================>| Time: 00:00:00

55   Style/StringLiterals
40   Layout/LineLength
39   Style/FrozenStringLiteralComment
6    Layout/EmptyLineAfterGuardClause
6    Style/IfUnlessModifier
4    Style/Documentation
3    Style/ExpandPathArguments
2    Layout/ArgumentAlignment
2    Layout/SpaceInsideArrayLiteralBrackets
2    Style/ClassAndModuleChildren
2    Style/StderrPuts
2    Style/SymbolArray
1    Bundler/OrderedGems
1    Layout/MultilineOperationIndentation
1    Metrics/AbcSize
1    Metrics/CyclomaticComplexity
1    Metrics/MethodLength
1    Metrics/PerceivedComplexity
1    Style/PerlBackrefs
1    Style/RedundantBegin
1    Style/SpecialGlobalVars
--
172  Total
```

Not a great start, let’s get this sorted out.

## The Process

Rubocop includes a tool to auto generate a configuration . Simply pass the `--auto-gen-config` flag to generate a configuration acting as a TODO list:

```sh
$ rubocop --auto-gen-config
$ rubocop .
The following cops were added to RuboCop, but are not configured. Please set Enabled to either `true` or `false` in your `.rubocop.yml` file:
 - Style/HashEachMethods
 - Style/HashTransformKeys
 - Style/HashTransformValues
Inspecting 40 files
......................................

40 files inspected, no offenses detected
```

This created two files _.rubocop.yml_ and _.rubocop_todo.yml_. The first is your project’s final configuration file, for now, it simply inherits a temporary configuration from _.rubocop_todo.yml_ (TO DO from now on). This allows the project to have no offenses. But the point of the TO DO is for us to remove the configuration records one by one as the offenses are removed from the code base or the configuration is moved outside of the TO DO.

First let’s fix the warnings by enabling the three cops that aren’t configured yet.

```yml
# .rubocop.yml

Style/HashEachMethods:
  Enabled: true

Style/HashTransformKeys:
  Enabled: true

Style/HashTransformValues:
  Enabled: true
```

```sh
$ rubocop .
Inspecting 40 files
........................................

40 files inspected, no offenses detected
```

Now let’s focus on the first entry of the TO DO:

```yml
# Offense count: 1
# Cop supports --auto-correct.
# Configuration parameters: TreatCommentsAsGroupSeparators, Include.
# Include: **/*.gemfile, **/Gemfile, **/gems.rb
Bundler/OrderedGems:
  Exclude:
    - 'Gemfile'
```

This cop seems like a good idea, as the project grows ordered gems will make the Gemfile easier to read. We also learned that the cop supports auto correct, so simply removing this block from the TODO and running rubocop autocorrect will remove the offense:

```sh
$ rubocop --auto-correct
Inspecting 40 files
C.......................................

Offenses:

Gemfile:39:3: C: [Corrected] Bundler/OrderedGems: Gems should be sorted in an alphabetical order within their section of the Gemfile. Gem listen should appear before web-console.
  gem 'listen', '>= 3.0.5', '< 3.2'
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

40 files inspected, 1 offense detected, 1 offense corrected
$ rubocop .
Inspecting 40 files
........................................

40 files inspected, no offenses detected
```

Now onto the next block:

```yml
# Offense count: 2
# Cop supports --auto-correct.
# Configuration parameters: EnforcedStyle, IndentationWidth.
# SupportedStyles: with_first_argument, with_fixed_indentation
Layout/ArgumentAlignment:
  Exclude:
    - 'bin/webpack'
    - 'bin/webpack-dev-server'
```

We do want the `Layout/ArgumentAlignment` cop, but files in the _bin/_ folder are usually automatically generated, and to avoid a constant back and forth, it’s probably better to avoid _bin/_ when running all the cops (`AllCops`). Add the following to your project’s Rubocop configuration (_.rubocop.yml_) and remove the block from the TO DO. While we are here, let’s also ignore _node_modules/_, I remember having some issues with ruby files inside node-sass.

```yml
AllCops:
  Exclude:
    - bin/*
    - node_modules/**/*
```

Similarly, remove all other cops’ configurations that deal only with files inside the bin/ folder (8 cops and some files inside a ninth).

```sh
$ rubocop .
Inspecting 32 files
................................

32 files inspected, no offenses detected
```

Cop by cop, decide what you want to do with each:
* Remove the excludes (so offenses are corrected or pop up)
* Move the excludes to _.rubocop.yml_ if you don’t want to deal with a cop/file combination.
* Completely disabling a cop, by setting `Enabled: false`
* Ignore the custom configuration in the TO DO and fallback to the default
* Change the recommended configuration.

I ended up removing the excludes for `Layout/SpaceInsideArrayLiteralBrackets`, `Style/SpecialGlobalVars`, `Style/StringLiterals` and `Style/SymbolArray`.

Moving the excludes for `Style/ClassAndModuleChildren`, because the two files were created by Rails and I don’t plan to touch them much: _test/channels/application_cable/connection_test.rb_ and _test/test_helper.rb_.

Disabling `Style/Documentation` and `Style/FrozenStringLiteralComment`.

Ignoring the configuration for `Metrics/AbcSize`, `Metrics/CyclomaticComplexity`, `Metrics/MethodLength` and `Metrics/PerceivedComplexity`.

Changing `Layout/LineLength`’s `Max` to 120. To match the rulers in my editor.

After going clearing the TO DO, remove the file and the line inheriting from it in your project’s configuration. Run rubocop’s autocorrect again:

```sh
$ rubocop --auto-correct
Inspecting 32 files
C.............C..........C.C.CC.

Offenses:

Gemfile:33:28: C: [Corrected] Style/SymbolArray: Use %i or %I for an array of symbols.
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
                           ^^^^^^^^^^^^^^^^^^^^^^^^^^

...

test/channels/application_cable/connection_test.rb:1:9: C: [Corrected] Style/StringLiterals: Prefer single-quoted strings when you don't need string interpolation or special symbols.
require "test_helper"
        ^^^^^^^^^^^^^

32 files inspected, 17 offenses detected, 17 offenses corrected
```

## The Result
All 17 offenses were corrected, let’s do it one more time to have a clean result:

```sh
$ rubocop .
Inspecting 32 files
................................

32 files inspected, no offenses detected
```

For this project, based on my preferences, the final _.rubocop.yml_ file looks like this:

```yml
AllCops:
  Exclude:
    - bin/**
    - node_modules/**/*

Style/HashEachMethods:
  Enabled: true

Style/HashTransformKeys:
  Enabled: true

Style/HashTransformValues:
  Enabled: true

Style/Documentation:
  Enabled: false

Style/FrozenStringLiteralComment:
  Enabled: false

Style/ClassAndModuleChildren:
  Exclude:
    - test/channels/application_cable/connection_test.rb
    - test/test_helper.rb

Layout/LineLength:
  Max: 120
```

___

<small>
  Photo by [Lenny Kuhne](https://unsplash.com/photos/jHZ70nRk7Ns) | "gray vehicle being fixed inside factory using robot machines"
</small>
