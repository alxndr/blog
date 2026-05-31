import { defineConfig } from 'cypress'
import { definePlugin as defineTestRandomizer } from 'cypress-test-order-randomizer'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4321',
    supportFile: false,
    async setupNodeEvents(on, config) {
      return defineTestRandomizer(on, config)
    },
  },
})
