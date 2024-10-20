interface CustomImportMeta extends ImportMeta {
  env: {
    VITE_BACKEND_URL: string;
  } & ImportMetaEnv;
}

const constants: {
  API_URL: string | undefined;
} = {
  API_URL: (import.meta as CustomImportMeta).env.VITE_BACKEND_URL
};

export default constants;
