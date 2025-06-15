/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**'],
      exclude: [
        'src/**/*.tsx', // UI components
        'src/i18n/**', // 靜態文案
        'src/types/**'
      ],
    },
  },
})