/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import eslint from 'vite-plugin-eslint';
// const path = require('path');

// https://vitejs.dev/config/
// /** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    eslint(),
  ],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //   },
  // },
  // 기본 포트 5173 => 3000 설정
  server: {
    port: 3000,
  },
});
