import { defineConfig } from 'cypress'
import { definePlugin as defineTestRandomizer } from 'cypress-test-order-randomizer'
import { plugin as cypressGrepPlugin } from '@cypress/grep/plugin'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4321',
    async setupNodeEvents(on, config) {
      cypressGrepPlugin(config)
      return defineTestRandomizer(on, config)
    },
  },
})
