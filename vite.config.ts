import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'types': '/src/types',
      'services': '/src/services',
      'components': '/src/components',
      'pages': '/src/pages',
      'styles': '/src/styles'
    }
  }
})

