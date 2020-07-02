module.exports = {
  roots: ['src/'],
  collectCoverageFrom: ['<rootDir/src/**/*.ts>'],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  }
 
};
