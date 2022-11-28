import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'

import './vite.init'

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      host: true,
      https: !!env.HTTPS,
      port: 6789,
    },
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue(),
        },
      }),
      Components({
        dirs: `${__dirname}/../packages/components/**`,
        extensions: ['vue'],
        dts: false,
        resolvers: [
          (componentName) => {
            if (componentName.startsWith('P'))
              return { name: componentName, from: '@pnpm-ui/components' }
          },
        ],
      }),
    ],
    optimizeDeps: {
      include: ['vue', '@vue/shared'],
    },
    esbuild: {
      target: 'chrome64',
    },
  }
})
