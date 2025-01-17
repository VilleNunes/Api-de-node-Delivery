
import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  bail: true,
  testEnvironment: "node",
  preset: "ts-jest",
};

export default config;
