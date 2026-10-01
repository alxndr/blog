#!/usr/bin/env node
// Creates the draft fixture post, runs a command, then removes the fixture.
//
// Usage: node scripts/with-draft-fixture.mjs <command> [args...]
//
// The draft-visibility specs need a post with `draft: true` to exist while the
// site is built and served. The build half runs against static output, so a
// fixture created *during* a test would never reach the page under test -- it
// has to be on disk before `astro build` and stay there until the run ends.
// Hence the fixture is managed here, around the whole command, rather than
// inside a test body.
//
// Cleanup runs on normal exit, on failure, and on SIGINT/SIGTERM, so an
// interrupted run does not leave a stray draft in src/data/blog-posts.

import { spawn } from 'child_process'
import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import {
  DRAFT_FIXTURE,
  DRAFT_FIXTURE_PATH,
  DRAFT_FIXTURE_CONTENT,
} from '../cypress/support/draft-fixture.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const fixtureAbs = join(root, DRAFT_FIXTURE_PATH)

const [command, ...args] = process.argv.slice(2)

if (!command) {
  console.error('usage: node scripts/with-draft-fixture.mjs <command> [args...]')
  process.exit(1)
}

let created = false

function removeFixture() {
  if (!created) return
  created = false
  try {
    unlinkSync(fixtureAbs)
  } catch (err) {
    if (err.code !== 'ENOENT') console.error(`with-draft-fixture: ${err.message}`)
  }
}

function writeFixture() {
  // Only ever clobber a byte-identical leftover from an interrupted previous
  // run; refuse to overwrite anything that looks like real content.
  try {
    const existing = readFileSync(fixtureAbs, 'utf-8')
    if (existing !== DRAFT_FIXTURE_CONTENT) {
      console.error(
        `with-draft-fixture: ${DRAFT_FIXTURE_PATH} already exists and is not the ` +
          `generated fixture. Move or delete it, then re-run.`
      )
      process.exit(1)
    }
    console.error(
      `with-draft-fixture: replacing a leftover fixture at ${DRAFT_FIXTURE_PATH}`
    )
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }

  writeFileSync(fixtureAbs, DRAFT_FIXTURE_CONTENT)
  created = true
}

writeFixture()

const child = spawn(command, args, {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

let signal = null

for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(sig, () => {
    signal = sig
    child.kill(sig)
  })
}

// Fires on success, failure, and signal death alike.
process.on('exit', removeFixture)

child.on('error', err => {
  console.error(`with-draft-fixture: ${err.message}`)
  removeFixture()
  process.exit(1)
})

child.on('close', (code, childSignal) => {
  removeFixture()
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(childSignal ? 1 : (code ?? 1))
})
