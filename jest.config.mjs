import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testTimeout: 20000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/features/**/api/**/*.{ts,tsx}',
    'src/features/**/model/**/*.{ts,tsx}',
    'src/widgets/**/model/**/*.{ts,tsx}',
    'src/entities/**/api/**/*.{ts,tsx}',
    'src/entities/**/model/**/*.{ts,tsx}',
    'src/shared/lib/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.types.ts',
    '!src/**/types.ts',
    '!src/**/*.query.ts',
    '!src/**/*.queries.ts',
    '!src/**/*.mutations.ts',
  ],
};

export default createJestConfig(config);
