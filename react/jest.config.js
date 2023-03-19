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
};

export default customJestConfig;
