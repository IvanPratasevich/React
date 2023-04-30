const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
    '^.+\\.module\\.css$': 'jest-transform-css',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/'],
  coveragePathIgnorePatterns: [
    'src/vite-env.d.ts',
    'src/constants/constants.ts',
    'src/main.tsx',
    'src/store/homeSlice.ts',
    'src/store/formSlice.ts',
    'src/mocks/handlers.ts',
    'src/server.ts',
    'src/entry-client.tsx',
    'src/entry-server.tsx',
  ],
};

export default customJestConfig;
