import fs from 'node:fs'
import terser from '@rollup/plugin-terser'
import viteCompression from 'vite-plugin-compression'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const cert = fs.existsSync('./localdev.crt') ? fs.readFileSync('./localdev.crt') : undefined
const key = fs.existsSync('./localdev.key') ? fs.readFileSync('./localdev.key') : undefined

// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                transformAssetUrls
            },
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({ autoImport: true }),
        viteCompression({
            algorithm: 'brotliCompress'
        }),
        nodePolyfills({
            globals: {
                Buffer: true, // can also be 'build', 'dev', or false
                global: true,
                process: true,
            },
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    },
    server: {
        port: 3025,
        https: {
            cert,
            key
        },
        hmr: {
            host: 'dev-aname.keycloak.june07.com',
        }
    },
    build: {
        minify: 'terser',
        sourcemap: true,
        rollupOptions: {
            plugins: [
                terser({
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                    mangle: true,
                }),
            ],
        },
    },
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern-compiler'
            }
        }
    }
})
