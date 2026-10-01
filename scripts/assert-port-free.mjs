import { createServer } from 'net'

const port = Number(process.argv[2])

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(`assert-port-free: invalid port ${process.argv[2]}`)
  process.exit(1)
}

// Astro/Vite may listen on IPv6 [::1] or IPv4 127.0.0.1 depending on the host,
// and `localhost` resolves to either, so both loopback families must be probed.
const hosts = ['127.0.0.1', '::1']

function fail(message) {
  console.error(`assert-port-free: ${message}`)
  process.exit(1)
}

let pending = hosts.length
let taken = false

for (const host of hosts) {
  const server = createServer()

  server.once('error', err => {
    if (err.code === 'EADDRINUSE') {
      taken = true
      return done()
    }
    // A missing IPv6 stack (or another non-EADDRINUSE error) must not mask a
    // real collision on the other family, so only report it if nothing is taken.
    if (!taken) fail(`${err.message} (probing ${host})`)
    done()
  })

  server.once('listening', () => server.close(done))

  server.listen(port, host)
}

function done() {
  if (--pending > 0) return
  if (taken) {
    fail(
      `port ${port} is already in use.\n` +
        `A server is already listening there, so start-server-and-test would poll\n` +
        `it and silently test that server instead of the one it starts.\n` +
        `Stop the process on port ${port} and retry.`
    )
  }
  process.exit(0)
}
