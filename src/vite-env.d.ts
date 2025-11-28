/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly PROD: boolean
  readonly DEV: boolean
  // добавьте другие переменные окружения по необходимости
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}