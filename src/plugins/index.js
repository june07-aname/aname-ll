/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

pinia.use(piniaPluginPersistedstate)

export function registerPlugins(app) {
    app
        .use(pinia)
        .use(router)
        .use(vuetify)
}
