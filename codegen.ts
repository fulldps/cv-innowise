import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3001/api/graphql',
  documents: ['src/**/*.{ts,tsx}', '!src/shared/api/graphql/**'],
  generates: {
    'src/shared/api/graphql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        scalars: {
          Void: 'void',
        },
      },
    },
  },
};

export default config;
