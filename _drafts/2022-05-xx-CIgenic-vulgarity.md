---
layout: post
title: CI-genic vulgarity
tags: [continuous-integration]
---

> or, How eager-censoring of secrets in Continuous Integration systems can unintentionally create vulgarities where there were none before

Continuous Integration systems (aka CI) will run tasks (e.g. automated tests, or analysis of code) when a change is made to a code repository (aka repo).)

They will sometimes have a write-once-read-never system for storing environment variables, because environment variables are sometimes used to control a program's behavior.

One CI system had a feature where it filtered the build output, and if any of the environment variable _values_ appeared in the output, they'd remove the value and replace it with some asterisks `***`. This is a useful safeguard when environment variables are used for API tokens or other long-lived values which should be considered private.

Someone I Met worked for a tech company which had a project code-named "Content Tools". This project was hooked up to a Continuous Integration system, which allows automated tests to be run on a proposed change to the system.

The project had environment variables, some of which were booleans (true / false), and the values used were "on" and "off". This meant that whenever the two letters "on" or three letters "off" occurred in the build's debugging logs, the word where they appeared would be somewhat mangled with asterisks, making the original word sometimes seem vulgar when it initially was not... Especially for a project name like "Content tools".
