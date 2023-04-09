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
  coveragePathIgnorePatterns: ['src/vite-env.d.ts', 'src/constants/constants.ts', 'src/main.tsx'],
};

export default customJestConfig;
