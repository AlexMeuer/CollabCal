/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string;
  readonly VITW_APPWRITE_PROJECT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
